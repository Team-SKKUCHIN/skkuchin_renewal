package skkuchin.service.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

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
import skkuchin.service.dto.PersonalChatRequestDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.PersonalChatRequestService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/personal-chat-request")
public class PersonalChatRequestController {
    private final PersonalChatRequestService personalChatRequestService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getPersonalChatRequestList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        PersonalChatRequestDto.Responses personalChatRequests = personalChatRequestService
                .getPersonalChatRequestList(principalDetails.getUser());
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 개인 채팅 요청 조회 완료", personalChatRequests), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> createPersonalChatRequest(@Valid @RequestBody PersonalChatRequestDto.PostRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("요청 정보를 모두 입력해주시기 바랍니다");
        }
        personalChatRequestService.createPersonalChatRequest(principalDetails.getUser().getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "개인 채팅 요청 생성 완료", true), HttpStatus.CREATED);
    }

    @PatchMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> replyPersonalChatRequest(@PathVariable Long requestId,
            @Valid @RequestBody PersonalChatRequestDto.ReplyRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("알맞은 응답을 입력해주시기 바랍니다");
        }
        personalChatRequestService.replyPersonalChatRequest(principalDetails.getUser().getId(), requestId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "개인 채팅 요청 응답 완료", true), HttpStatus.OK);
    }
}
