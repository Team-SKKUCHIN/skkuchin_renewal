package skkuchin.service.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.SmsDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.SmsService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sms")
public class SmsController {
    private final SmsService smsService;

    @PostMapping("")
    public ResponseEntity<?> enrollPhoneNumber(@Valid @RequestBody SmsDto.PostRequest dto,
            BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("정보를 모두 입력해주시기 바랍니다");
        }
        smsService.enrollPhoneNumber(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "전화번호 등록 완료", true), HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> updatePhoneNumber(@Valid @RequestBody SmsDto.PutRequest dto, BindingResult bindingResult,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("전화번호를 입력해주시기 바랍니다");
        }
        smsService.updatePhoneNumber(principalDetails.getUser(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "전화번호 수정 완료", true), HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPhoneNumber(@Valid @RequestBody SmsDto.VerificationRequest dto,
            BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("정보를 모두 입력해주시기 바랍니다");
        }
        smsService.verifyPhoneNumber(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "인증번호 검증 완료", true), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> verifyPhoneNumber(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        smsService.deletePhoneNumber(principalDetails.getUser());
        return new ResponseEntity<>(new CMRespDto<>(1, "전화번호 삭제 완료", true), HttpStatus.OK);
    }
}
