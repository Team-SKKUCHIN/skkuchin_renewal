package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.service.EmailService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    @GetMapping("/signup")
    public ResponseEntity<?> sendEmail(@Valid @RequestBody UserDto.EmailRequest dto) throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmail(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 인증 이메일 전송 완료", null), HttpStatus.OK);
    }

    @GetMapping("/confirm/signup")
    public ResponseEntity<Boolean> signupConfirm(@ModelAttribute EmailAuthRequestDto requestDto) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok().body(emailService.confirmSignup(requestDto));
    }

    @GetMapping("/signup/check")
    public ResponseEntity<?> checkSignup(@RequestBody Map<String, String> usernameMap) {
        Boolean isAuth = emailService.checkSignup(usernameMap.get("username"));
        return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 이메일 인증 여부 확인 완료", isAuth), HttpStatus.OK);
    }

    @GetMapping("/password")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> sendResetEmail(@RequestBody Map<String, String> emailMap, @AuthenticationPrincipal PrincipalDetails principalDetails) throws MessagingException, UnsupportedEncodingException {
        Long userId = principalDetails.getUser().getId();
        emailService.sendResetEmail(emailMap.get("email"), userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "비밀번호 초기화 인증 메일 발송 완료", null), HttpStatus.OK);
    }

    @GetMapping("/confirm/password")
    public ResponseEntity<Boolean> passwordConfirm(@ModelAttribute EmailAuthRequestDto requestDto) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok().body(emailService.confirmPassword(requestDto));
    }

    @GetMapping("/password/check")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> checkPassword(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        Boolean isAuth = emailService.checkPassword(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "비밀번호 초기화 이메일 인증 여부 확인 완료", isAuth), HttpStatus.OK);
    }

    @GetMapping("/username")
    public ResponseEntity<?> sendUsernameEmail(@RequestBody Map<String, String> emailMap) throws MessagingException, UnsupportedEncodingException {
        emailService.sendUsernameEmail(emailMap.get("email"));
        return new ResponseEntity<>(new CMRespDto<>(1, "아이디 찾기 인증 메일 발송 완료", null), HttpStatus.OK);
    }

    @GetMapping("/confirm/username")
    public ResponseEntity<String> usernameConfirm(@ModelAttribute EmailAuthRequestDto requestDto) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok().body(emailService.findUsername(requestDto));
    }

}
