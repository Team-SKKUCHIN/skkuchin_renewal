package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.MatchingUserDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.MatchingUserService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matching")
public class MatchingUserController {
    private final MatchingUserService matchingUserService;

    @PostMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addInfo(@Valid @RequestBody MatchingUserDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                if (errorMap.containsKey("keywords")) {
                    throw new CustomValidationApiException("키워드는 3개부터 8개까지 입력 가능합니다", errorMap);
                }
                throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            matchingUserService.addInfo(user.getId(), dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "프로필 입력이 완료되었습니다", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("적합하지 않은 정보가 포함되었습니다");
        }
    }

    @PostMapping("/user/new/{username}")
    public ResponseEntity<?> addNewInfo(@PathVariable String username, @Valid @RequestBody MatchingUserDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                if (errorMap.containsKey("keywords")) {
                    throw new CustomValidationApiException("키워드는 3개부터 8개까지 입력 가능합니다", errorMap);
                }
                throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
            }
            matchingUserService.addNewInfo(username, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "추가 정보 입력이 완료되었습니다", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("적합하지 않은 정보가 포함되었습니다");
        }
    }

    @PostMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUserInfo(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.Request dto) {
        matchingUserService.addInfo(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자의 추가 정보 입력 완료", null), HttpStatus.CREATED);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        MatchingUserDto.Response info = matchingUserService.getMyInfo(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "나의 프로필 관련 정보 조회 완료", info), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getUserInfo(@PathVariable Long userId) {
        MatchingUserDto.Response info = matchingUserService.getUserInfo(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 프로필 관련 정보 조회 완료", info), HttpStatus.OK);
    }

    @PutMapping("/user/status")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateMatchingStatus(@Valid @RequestBody MatchingUserDto.StatusRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        matchingUserService.updateMatchingStatus(user.getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "참여중 여부 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/user/status/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUserMatchingStatus(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.StatusRequest dto) {
        matchingUserService.updateMatchingStatus(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 참여중 여부 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateInfo(@Valid @RequestBody MatchingUserDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                if (errorMap.containsKey("keywords")) {
                    throw new CustomValidationApiException("키워드는 3개부터 8개까지 입력 가능합니다", errorMap);
                }
                throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            if (Objects.nonNull(user.getGender())) {
                matchingUserService.updateInfo(user.getId(), dto);
            } else {
                matchingUserService.addInfo(user.getId(), dto);
            }
            return new ResponseEntity<>(new CMRespDto<>(1, "수정이 완료되었습니다", null), HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("적합하지 않은 정보가 포함되었습니다");
        }
    }

    @PutMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUserInfo(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.Request dto) {
        matchingUserService.updateInfo(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 키워드 수정 완료", null), HttpStatus.OK);
    }
}
