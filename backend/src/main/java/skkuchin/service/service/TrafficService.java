package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import skkuchin.service.domain.User.Content;
import skkuchin.service.domain.User.Traffic;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.TrafficRepo;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TrafficService {
    private final TrafficRepo trafficRepo;

    @Transactional
    public void makeTraffic(String contentName) {
        if (contentName == null || contentName.isBlank()) {
            throw new CustomRuntimeException("트래픽 내용이 없습니다", "트래픽 갱신 실패");
        }
        
        Traffic existingTraffic = trafficRepo.findByContent(Content.valueOf(contentName))
            .orElse(Traffic.builder().content(Content.valueOf(contentName)).count(0).build());

        int updatedCount = existingTraffic.getCount() + 1;
        existingTraffic.setCount(updatedCount);

        trafficRepo.save(existingTraffic);

        log.info("Traffic count for {}: {}", contentName, updatedCount);
    }
}