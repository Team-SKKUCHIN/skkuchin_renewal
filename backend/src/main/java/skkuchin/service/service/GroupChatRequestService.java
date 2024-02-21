package skkuchin.service.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.GroupChatRequest;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ProfileStatus;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.GroupChatRequestDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.GroupChatRequestRepo;
import skkuchin.service.repo.GroupProfileRepo;

@Service
@RequiredArgsConstructor
public class GroupChatRequestService {
    private static final Pattern LINK_PATTERN = Pattern.compile("https://open\\.kakao\\.com/o/[a-zA-Z0-9]+");
    private final GroupChatRequestRepo groupChatRequestRepo;
    private final GroupProfileRepo groupProfileRepo;
    private final SmsService smsService;

    @Transactional
    public GroupChatRequestDto.Responses getGroupChatRequestList(Long userId) {
        List<GroupChatRequest> groupChatRequests = groupChatRequestRepo.findValidGroupChatRequests(userId);

        List<GroupChatRequestDto.BaseResponse> receiveRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() == ResponseType.HOLD
                        && request.getReceiver().getFriend1().getId().equals(userId))
                .map(GroupChatRequestDto.BaseResponse::new)
                .sorted(Comparator.comparing(GroupChatRequestDto.BaseResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());

        List<GroupChatRequestDto.BaseResponse> sendRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() == ResponseType.HOLD
                        && request.getSender().getFriend1().getId().equals(userId))
                .map(GroupChatRequestDto.BaseResponse::new)
                .sorted(Comparator.comparing(GroupChatRequestDto.BaseResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());

        List<GroupChatRequestDto.ConfirmedResponse> confirmedRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() != ResponseType.HOLD)
                .map(GroupChatRequestDto.ConfirmedResponse::new)
                .sorted(Comparator.comparing(GroupChatRequestDto.ConfirmedResponse::getConfirmedAt).reversed())
                .collect(Collectors.toList());

        return new GroupChatRequestDto.Responses(receiveRequests, sendRequests, confirmedRequests);
    }

    @Transactional
    public void createGroupChatRequest(Long userId, GroupChatRequestDto.PostRequest dto) {
        GroupProfile receiver = groupProfileRepo.findById(dto.getReceiverId())
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹 프로필입니다"));
        GroupProfile sender = groupProfileRepo.findById(dto.getSenderId())
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹 프로필입니다"));

        if (sender.getFriend1().getSmsLists().size() == 0) {
            throw new CustomRuntimeException("요청자의 전화번호가 등록되지 않았습니다");
        }
        if (receiver.getStatus() == ProfileStatus.INACTIVE || sender.getStatus() == ProfileStatus.INACTIVE) {
            throw new CustomRuntimeException("비활성화된 프로필입니다");
        }
        if (receiver.getFriend1().getId() == userId || sender.getFriend1().getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        if (!LINK_PATTERN.matcher(dto.getLink()).matches()) {
            throw new CustomRuntimeException("오픈 채팅방 링크가 유효하지 않습니다");
        }
        groupChatRequestRepo.save(dto.toEntity(sender, receiver));

        if (receiver.getFriend1().getSmsLists().size() > 0) {
            smsService.sendSms(
                    receiver.getFriend1().getSmsLists().get(0).getPhoneNumber(),
                    String.format("[스꾸친] %s 팀이 밥약을 신청했습니다", sender.getGroupName()));
        }
    }

    @Transactional
    public void replyGroupChatRequest(Long userId, Long requestId, GroupChatRequestDto.ReplyRequest dto) {
        ResponseType status = dto.getStatus();
        GroupChatRequest request = groupChatRequestRepo.findById(requestId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹채팅 요청입니다"));

        if (request.getReceiver().getFriend1().getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        request.setConfirmedAt(LocalDateTime.now());
        request.setStatus(dto.getStatus());
        groupChatRequestRepo.save(request);

        AppUser sendUser = request.getSender().getFriend1();
        if (sendUser.getSmsLists().size() > 0) {
            String message;
            if (status == ResponseType.ACCEPT) {
                message = "[스꾸친] %s 팀이 밥약을 수락했습니다";
            } else if (status == ResponseType.REFUSE) {
                message = "[스꾸친] %s 팀이 밥약을 거절했습니다";
            } else {
                throw new CustomRuntimeException("비정상적인 접근입니다");
            }
            smsService.sendSms(
                    sendUser.getSmsLists().get(0).getPhoneNumber(),
                    String.format(message, request.getReceiver().getGroupName()));
        }
    }

    @Transactional
    @Scheduled(cron = "0 0 3 * * ?")
    public void makeExpired() {
        List<GroupChatRequest> requests = groupChatRequestRepo.findAll();
        for (GroupChatRequest request : requests) {
            if (request.getStatus().equals(ResponseType.REFUSE)) {
                LocalDateTime confirmedAtPlus7Days = request.getConfirmedAt().plus(7, ChronoUnit.DAYS);
                if (LocalDateTime.now().isAfter(confirmedAtPlus7Days)) {
                    request.setStatus(ResponseType.EXPIRED);
                    groupChatRequestRepo.save(request);
                }
            }
        }
    }
}
