package skkuchin.service.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.GroupChatRequestDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.GroupChatRequestService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/group-chat-request")
public class GroupChatRequestController {
    private final GroupChatRequestService groupChatRequestService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getGroupChatRequestList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        GroupChatRequestDto.Responses groupChatRequests = groupChatRequestService
                .getGroupChatRequestList(principalDetails.getUser().getId());
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 그룹 채팅 요청 조회 완료", groupChatRequests), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> createGroupChatRequest(@Valid @RequestBody GroupChatRequestDto.PostRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        try {
            Map<String, String> errorMap = new HashMap<>();
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("요청 정보를 모두 입력해주시기 바랍니다");
            }
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("이미 신청하셨습니다");
        }
        groupChatRequestService.createGroupChatRequest(principalDetails.getUser().getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹 채팅 요청 생성 완료", true), HttpStatus.CREATED);
    }

    @PatchMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> replyGroupChatRequest(@PathVariable Long requestId,
            @Valid @RequestBody GroupChatRequestDto.ReplyRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("알맞은 응답을 입력해주시기 바랍니다");
        }
        groupChatRequestService.replyGroupChatRequest(principalDetails.getUser().getId(), requestId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹 채팅 요청 응답 완료", true), HttpStatus.OK);
    }
}
