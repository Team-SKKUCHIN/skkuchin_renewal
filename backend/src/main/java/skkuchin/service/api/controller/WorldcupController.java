package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.WorldcupDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.WorldcupService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/worldcup")
@Slf4j
public class WorldcupController {
    private final WorldcupService worldcupService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        List<WorldcupDto.Response> places = worldcupService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "월드컵 순위 조회 완료", places), HttpStatus.OK);
    }

    @GetMapping("/place/{placeId}")
    public ResponseEntity<?> getDetail(@PathVariable Long placeId) {
        WorldcupDto.Response place = worldcupService.getDetail(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "월드컵 결승 식당 상세 조회 완료", place), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody WorldcupDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("월드컵 결과를 작성해주시기 바랍니다", errorMap);
        }
        worldcupService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "월드컵 결과 등록 완료", null), HttpStatus.CREATED);
    }
}
