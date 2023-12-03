package skkuchin.service.api.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.service.TrafficService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/traffic")
public class TrafficController {
    private final TrafficService trafficService;

    @PostMapping("")
    public ResponseEntity<?> makeTraffic(@RequestBody Map<String, String> contentMap) {
        trafficService.makeTraffic(contentMap.get("content"));
        return new ResponseEntity<>(new CMRespDto<>(1, "트래픽이 집계되었습니다", null), HttpStatus.CREATED);
    }
}
