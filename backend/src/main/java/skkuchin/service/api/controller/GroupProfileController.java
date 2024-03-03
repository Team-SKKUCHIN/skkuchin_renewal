package skkuchin.service.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.GroupProfileDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.GroupProfileService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/group-profile")
public class GroupProfileController {
    private final GroupProfileService groupProfileService;

    @GetMapping("")
    public ResponseEntity<?> getGroupProfileList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<GroupProfileDto.SummaryResponse> groupProfiles;
        if (principalDetails != null && principalDetails.getUser() != null) {
            groupProfiles = groupProfileService.getGroupProfileListAsUser(principalDetails.getUser().getId());
        } else {
            groupProfiles = groupProfileService.getGroupProfileListAsNonUser();
        }
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 그룹 프로필 조회 완료", groupProfiles), HttpStatus.OK);
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getMyGroupProfileList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<GroupProfileDto.SummaryResponse> groupProfiles = groupProfileService
                .getMyGroupProfileList(principalDetails.getUser().getId());
        return new ResponseEntity<>(new CMRespDto<>(1, "나의 그룹 프로필 조회 완료", groupProfiles), HttpStatus.OK);
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<?> getGroupProfile(@PathVariable Long profileId) {
        GroupProfileDto.FullResponse groupProfile = groupProfileService.getGroupProfile(profileId);
        return new ResponseEntity<>(new CMRespDto<>(1, "특정 그룹 프로필 조회 완료", groupProfile), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> createGroupProfile(@Valid @RequestBody GroupProfileDto.PostRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("프로필 정보를 모두 입력해주시기 바랍니다");
        }
        groupProfileService.createGroupProfile(dto, principalDetails.getUser());
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹 프로필 생성 완료", true), HttpStatus.CREATED);
    }

    @PatchMapping("/{profileId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> updateGroupProfile(@PathVariable Long profileId,
            @Valid @RequestBody GroupProfileDto.PatchRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("프로필 소개 문구를 모두 입력해주시기 바랍니다");
        }
        groupProfileService.updateGroupProfile(profileId, principalDetails.getUser().getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹 프로필 수정 완료", true), HttpStatus.OK);
    }

    @PostMapping("/check/group-name")
    public ResponseEntity<?> checkGroupName(@RequestBody Map<String, String> groupNameMap) {
        groupProfileService.checkGroupName(groupNameMap.get("group_name"));
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹명 중복 확인 완료", true), HttpStatus.OK);
    }

    @DeleteMapping("/{profileId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> inactivateGroupProfile(@PathVariable Long profileId,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        groupProfileService.inactivateGroupProfile(principalDetails.getUser().getId(), profileId);
        return new ResponseEntity<>(new CMRespDto<>(1, "그룹 프로필 비활성화 완료", true), HttpStatus.OK);
    }

    @GetMapping("/random-name")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getRandomName(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        String randomName = groupProfileService.getRandomName(principalDetails.getUser());
        return new ResponseEntity<>(new CMRespDto<>(1, "랜덤 그룹명 조회 완료", randomName), HttpStatus.OK);
    }
}
