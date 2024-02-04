package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.PlaceDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.PlaceService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
@Slf4j
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        List<PlaceDto.Response> places = placeService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 장소 조회 완료", places), HttpStatus.OK);
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<?> getDetail(@PathVariable Long placeId) {
        PlaceDto.Response place = placeService.getDetail(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 상세 정보 조회 완료", place), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> add(@Valid @ModelAttribute PlaceDto.PostRequest dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("식당 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        placeService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 추가 완료", null), HttpStatus.CREATED);
    }

    @PostMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> addAll(@Valid @RequestBody List<PlaceDto.PostRequest> dto) {
        placeService.addAll(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "여러 장소 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long placeId, @Valid @ModelAttribute PlaceDto.PutRequest dto,
            BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("식당 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        placeService.update(placeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long placeId) {
        placeService.delete(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 삭제 완료", null), HttpStatus.OK);
    }

    @GetMapping("/noreview")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getNoReview() {
        List<PlaceDto.AdminResponse> places = placeService.getNoReview();
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 없는 장소 조회 완료", places), HttpStatus.OK);
    }

    @GetMapping("/noimage")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getNoImage() {
        List<PlaceDto.AdminResponse> places = placeService.getNoImage();
        return new ResponseEntity<>(new CMRespDto<>(1, "이미지 없는 장소 조회 완료", places), HttpStatus.OK);
    }

    @GetMapping("/nomenu")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getNoMenu() {
        List<PlaceDto.AdminResponse> places = placeService.getNoMenu();
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 없는 장소 조회 완료", places), HttpStatus.OK);
    }
}
