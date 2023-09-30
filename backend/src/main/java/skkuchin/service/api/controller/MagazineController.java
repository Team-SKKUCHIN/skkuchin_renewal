package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.MagazineDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.MagazineService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/magazine")
@RequiredArgsConstructor
public class MagazineController {
    private final MagazineService magazineService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addMagazine(@Valid @RequestBody MagazineDto.PostRequest dto
            , @AuthenticationPrincipal PrincipalDetails principalDetails, BindingResult bindingResult){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
        }
        AppUser appUser = principalDetails.getUser();
        System.out.println("appUser = " + appUser.getUsername());
        magazineService.addMagazine(appUser,dto);
        return new ResponseEntity<>(new CMRespDto<>(1,"매거진 생성 완료",null), HttpStatus.CREATED);
    }



    @GetMapping("")
    public ResponseEntity<?> getAllMagazine(){
        List<MagazineDto.Response> magazines = magazineService.getMagazine();
        return new ResponseEntity<>(new CMRespDto<>(1,"매거진 조회 완료",magazines), HttpStatus.OK);
    }

    @GetMapping("/{magazineId}")
    public ResponseEntity<?> getSpecificMagazine(@PathVariable Long magazineId){
        MagazineDto.Response magazine = magazineService.getSpecificMagazine(magazineId);
        return new ResponseEntity<>(new CMRespDto<>(1,"특정 매거진 조회 완료",magazine),HttpStatus.OK);
    }

    @DeleteMapping("/{magazineId}")
    public ResponseEntity<?> deleteMagazine(@PathVariable Long magazineId,@AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        magazineService.deleteMagazine(appUser, magazineId);
        return new ResponseEntity<>(new CMRespDto<>(1,"매거진 삭제 완료",null),HttpStatus.OK);
    }

    @PutMapping("/{magazineId}")
    public ResponseEntity<?> updateMagazine(@PathVariable Long magazineId,@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @Valid @RequestBody MagazineDto.PutRequest dto, BindingResult bindingResult){
        AppUser appUser = principalDetails.getUser();
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("매거진 관련 필수 수정 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        magazineService.updateMagazine(appUser, magazineId,dto);
        return new ResponseEntity<>(new CMRespDto<>(1,"매거진 수정 완료",null),HttpStatus.OK);
    }



}


