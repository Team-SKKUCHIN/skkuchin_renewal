package skkuchin.service.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.PersonalChatRequest;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.PersonalChatRequestDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.PersonalChatRequestRepo;
import skkuchin.service.repo.UserRepo;

@Service
@RequiredArgsConstructor
public class PersonalChatRequestService {
    private static final Pattern LINK_PATTERN = Pattern.compile("https://open\\.kakao\\.com/o/[a-zA-Z0-9]+");
    private final PersonalChatRequestRepo personalChatRequestRepo;
    private final UserRepo userRepo;

    @Transactional
    public PersonalChatRequestDto.Responses getPersonalChatRequestList(AppUser user) {
        Long userId = user.getId();

        List<PersonalChatRequest> personalChatRequests = personalChatRequestRepo.findValidPersonalChatRequests(userId);

        List<PersonalChatRequestDto.BaseResponse> receiveRequests = new ArrayList<>();
        List<PersonalChatRequestDto.BaseResponse> sendRequests = new ArrayList<>();
        List<PersonalChatRequestDto.ConfirmedResponse> allConfirmedRequests = new ArrayList<>();

        for (PersonalChatRequest request : personalChatRequests) {
            List<String> senderKeywordNames = request.getSender().getUserKeywords().stream()
                    .map(userKeyword -> userKeyword.getKeyword().getName())
                    .collect(Collectors.toList());

            List<String> receiverKeywordNames = request.getReceiver().getUserKeywords().stream()
                    .map(userKeyword -> userKeyword.getKeyword().getName())
                    .collect(Collectors.toList());

            if (request.getStatus() == ResponseType.HOLD) {
                if (request.getReceiver().getId() == userId) {
                    receiveRequests.add(
                            new PersonalChatRequestDto.BaseResponse(request, request.getSender(), senderKeywordNames));
                } else if (request.getSender().getId() == userId) {
                    sendRequests.add(new PersonalChatRequestDto.BaseResponse(request, request.getSender(),
                            receiverKeywordNames));
                }
            } else {
                PersonalChatRequestDto.ConfirmedResponse confirmedResponse;
                if (request.getSender().getId() == userId) {
                    confirmedResponse = new PersonalChatRequestDto.ConfirmedResponse(request, request.getReceiver(),
                            receiverKeywordNames);
                } else {
                    confirmedResponse = new PersonalChatRequestDto.ConfirmedResponse(request, request.getSender(),
                            senderKeywordNames);
                }
                allConfirmedRequests.add(confirmedResponse);
            }
        }

        receiveRequests.sort(Comparator.comparing(PersonalChatRequestDto.BaseResponse::getCreatedAt).reversed());
        sendRequests.sort(Comparator.comparing(PersonalChatRequestDto.BaseResponse::getCreatedAt).reversed());
        allConfirmedRequests
                .sort(Comparator.comparing(PersonalChatRequestDto.ConfirmedResponse::getConfirmedAt).reversed());

        return new PersonalChatRequestDto.Responses(receiveRequests, sendRequests, allConfirmedRequests);
    }

    @Transactional
    public void createPersonalChatRequest(Long userId, PersonalChatRequestDto.PostRequest dto) {
        AppUser receiver = userRepo.findById(dto.getReceiverId())
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        AppUser sender = userRepo.findById(dto.getSenderId())
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));

        if (receiver.getId() == userId || sender.getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        if (!LINK_PATTERN.matcher(dto.getLink()).matches()) {
            throw new CustomRuntimeException("오픈 채팅방 링크가 유효하지 않습니다");
        }
        personalChatRequestRepo.save(dto.toEntity(sender, receiver));
    }

    @Transactional
    public void replyPersonalChatRequest(Long userId, Long requestId, PersonalChatRequestDto.ReplyRequest dto) {
        PersonalChatRequest request = personalChatRequestRepo.findById(requestId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 개인 채팅 요청입니다"));

        if (request.getReceiver().getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        request.setConfirmedAt(LocalDateTime.now());
        request.setStatus(dto.getStatus());
        personalChatRequestRepo.save(request);
    }

    @Transactional
    @Scheduled(cron = "0 0 4 * * ?")
    public void makeExpired() {
        List<PersonalChatRequest> requests = personalChatRequestRepo.findAll();
        for (PersonalChatRequest request : requests) {
            if (request.getStatus().equals(ResponseType.REFUSE)) {
                LocalDateTime confirmedAtPlus7Days = request.getConfirmedAt().plus(7, ChronoUnit.DAYS);
                if (LocalDateTime.now().isAfter(confirmedAtPlus7Days)) {
                    request.setStatus(ResponseType.EXPIRED);
                    personalChatRequestRepo.save(request);
                }
            }
        }
    }
}
