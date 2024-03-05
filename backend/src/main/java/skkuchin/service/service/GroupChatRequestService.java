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
import skkuchin.service.domain.User.Sms;
import skkuchin.service.dto.GroupChatRequestDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.GroupChatRequestRepo;
import skkuchin.service.repo.GroupProfileRepo;
import skkuchin.service.repo.SmsRepo;
import skkuchin.service.util.StringUtils;

@Service
@RequiredArgsConstructor
public class GroupChatRequestService {
    private static final Pattern LINK_PATTERN = Pattern.compile("https://open\\.kakao\\.com/o/[a-zA-Z0-9]+");
    private final GroupChatRequestRepo groupChatRequestRepo;
    private final GroupProfileRepo groupProfileRepo;
    private final SmsRepo smsRepo;
    private final SmsService smsService;

    @Transactional
    public GroupChatRequestDto.Responses getGroupChatRequestList(Long userId) {
        List<GroupChatRequest> groupChatRequests = groupChatRequestRepo.findValidGroupChatRequests(userId);

        List<GroupChatRequestDto.BaseResponse> receiveRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() == ResponseType.HOLD
                        && request.getReceiver().getFriend1().getId() == userId)
                .map((request) -> {
                    GroupChatRequestDto.ProfileResponse senderProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getSender(), false);
                    GroupChatRequestDto.ProfileResponse receiverProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getReceiver(), true);
                    return new GroupChatRequestDto.BaseResponse(request, senderProfile, receiverProfile);
                })
                .sorted(Comparator.comparing(GroupChatRequestDto.BaseResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());

        List<GroupChatRequestDto.BaseResponse> sendRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() == ResponseType.HOLD
                        && request.getSender().getFriend1().getId() == userId)
                .map((request) -> {
                    GroupChatRequestDto.ProfileResponse senderProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getSender(), true);
                    GroupChatRequestDto.ProfileResponse receiverProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getReceiver(), false);
                    return new GroupChatRequestDto.BaseResponse(request, senderProfile, receiverProfile);
                })
                .sorted(Comparator.comparing(GroupChatRequestDto.BaseResponse::getCreatedAt).reversed())
                .collect(Collectors.toList());

        List<GroupChatRequestDto.ConfirmedResponse> confirmedRequests = groupChatRequests.stream()
                .filter(request -> request.getStatus() != ResponseType.HOLD)
                .map((request) -> {
                    GroupChatRequestDto.ProfileResponse senderProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getSender(), request.getSender().getFriend1().getId() == userId);
                    GroupChatRequestDto.ProfileResponse receiverProfile = new GroupChatRequestDto.ProfileResponse(
                            request.getReceiver(), request.getReceiver().getFriend1().getId() == userId);
                    return new GroupChatRequestDto.ConfirmedResponse(request, senderProfile, receiverProfile);
                })
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

        List<Sms> receiverSmsList = smsRepo.findByUser(receiver.getFriend1());

        if (receiver.getStatus() == ProfileStatus.INACTIVE || sender.getStatus() == ProfileStatus.INACTIVE) {
            throw new CustomRuntimeException("비활성화된 프로필입니다");
        }
        if (sender.getFriend1().getId() != userId || receiver.getFriend1().getId() == userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        if (!LINK_PATTERN.matcher(dto.getLink()).matches()) {
            throw new CustomRuntimeException("오픈 채팅방 링크가 유효하지 않습니다");
        }
        groupChatRequestRepo.save(dto.toEntity(sender, receiver));

        if (!receiverSmsList.isEmpty()) {
            smsService.sendSms(
                    receiverSmsList.get(0).getPhoneNumber(),
                    String.format(
                            "%s 그룹 밥약을 신청했어요.\n신청 현황에서 확인 후 수락해주세요.\n\n" +
                                    "▶ 스꾸친 바로가기 : https://skkuchin.com/",
                            StringUtils.getPostWord(sender.getGroupName(), "이", "가")));
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

        List<Sms> senderSmsList = smsRepo.findByUser(request.getSender().getFriend1());
        if (!senderSmsList.isEmpty()) {
            String message;
            if (status == ResponseType.ACCEPT) {
                message = "%s 그룹 밥약을 수락했어요. 곧 오픈채팅 링크로 입장할 예정이에요. 3일 이내에 입장하지 않는다면 '스꾸친 카카오톡'으로 연락주세요.\n\n" +
                        "▶ 스꾸친 바로가기 : https://skkuchin.com/\n" +
                        "▶ 카카오톡 채널 : https://pf.kakao.com/_KmNnG";
            } else if (status == ResponseType.REFUSE) {
                message = "[신청 현황 > 확정 내역]에서 그룹 밥약 결과를 확인해주세요.\n\n" +
                        "▶ 스꾸친 바로가기 : https://skkuchin.com/";
            } else {
                throw new CustomRuntimeException("비정상적인 접근입니다");
            }
            smsService.sendSms(
                    senderSmsList.get(0).getPhoneNumber(),
                    String.format(
                            message,
                            StringUtils.getPostWord(request.getReceiver().getGroupName(), "이", "가")));
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

    @Transactional
    public void insertData() {
        String link = "https://open.kakao.com/o/sn34U0dg";

        createGroupChatRequest(3L, new GroupChatRequestDto.PostRequest(1L, 2L, link));
        createGroupChatRequest(3L, new GroupChatRequestDto.PostRequest(1L, 3L, link));
        createGroupChatRequest(3L, new GroupChatRequestDto.PostRequest(1L, 4L, link));
        createGroupChatRequest(3L, new GroupChatRequestDto.PostRequest(1L, 5L, link));

        createGroupChatRequest(8L, new GroupChatRequestDto.PostRequest(6L, 1L, link));
        createGroupChatRequest(9L, new GroupChatRequestDto.PostRequest(7L, 1L, link));
        createGroupChatRequest(10L, new GroupChatRequestDto.PostRequest(8L, 1L, link));
        createGroupChatRequest(11L, new GroupChatRequestDto.PostRequest(9L, 1L, link));

        replyGroupChatRequest(6L, 3L, new GroupChatRequestDto.ReplyRequest(ResponseType.ACCEPT));
        replyGroupChatRequest(7L, 4L, new GroupChatRequestDto.ReplyRequest(ResponseType.REFUSE));
        replyGroupChatRequest(3L, 7L, new GroupChatRequestDto.ReplyRequest(ResponseType.ACCEPT));
        replyGroupChatRequest(3L, 8L, new GroupChatRequestDto.ReplyRequest(ResponseType.REFUSE));
    }
}
