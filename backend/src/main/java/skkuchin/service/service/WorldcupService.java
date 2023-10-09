package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.MatchingUserDto;
import skkuchin.service.dto.WorldcupDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.repo.WorldcupRepo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorldcupService {
    private final WorldcupRepo worldcupRepo;
    private final UserRepo userRepo;
    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final UserKeywordRepo userKeywordRepo;

    private final Random random = new Random();

    @Transactional
    public List<WorldcupDto.Response> getAll() {
        Map<Place, Integer> placeCountMap = getPlacesOrderedByOccurrence();

        List<Place> allPlaces = new ArrayList<>(placeCountMap.keySet());
        allPlaces.sort((place1, place2) -> {
            int count1 = placeCountMap.getOrDefault(place1, 0);
            int count2 = placeCountMap.getOrDefault(place2, 0);
            return Integer.compare(count2, count1);
        });

        int sumOfCounts = placeCountMap.values().stream().mapToInt(Integer::intValue).sum();

        List<WorldcupDto.Response> places = allPlaces.stream()
                .map(place -> {
                    int count = placeCountMap.getOrDefault(place, 0);
                    float winningRate = ((float) count) / sumOfCounts * 100.0f;

                    List<Image> images = imageRepo.findByPlace(place);

                    List<Worldcup> worldcups = worldcupRepo.findByPlace(place);
                    if (worldcups.size() > 3) {
                        worldcups = worldcups.subList(0, 3);
                    }

                    List<AppUser> users = worldcups.stream()
                            .map(worldcup -> worldcup.getUser())
                            .filter(user -> Objects.nonNull(user.getMatching()) && user.getMatching())
                            .collect(Collectors.toList());

                    List<MatchingUserDto.Response> matchingUsers = users.stream()
                            .map(user -> {
                                List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
                                return new MatchingUserDto.Response(user, keywords);
                            })
                            .collect(Collectors.toList());

                    return new WorldcupDto.Response(place, images, matchingUsers, winningRate);
                })
                .collect(Collectors.toList());

        return places;
    }

    @Transactional
    public WorldcupDto.Response getDetail(Long placeId) {
        Place winnerPlace = placeRepo.findById(placeId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));

        List<Image> images = imageRepo.findByPlace(winnerPlace);
        List<Worldcup> worldcups = worldcupRepo.findByPlace(winnerPlace);
        if (worldcups.size() > 3) {
            worldcups = worldcups.subList(0, 3);
        }

        List<AppUser> users = worldcups.stream()
                .map(worldcup -> worldcup.getUser())
                .filter(user -> Objects.nonNull(user.getMatching()) && user.getMatching())
                .collect(Collectors.toList());

        List<MatchingUserDto.Response> matchingUsers = users.stream()
                .map(user -> {
                    List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
                    return new MatchingUserDto.Response(user, keywords);
                })
                .collect(Collectors.toList());

        return new WorldcupDto.Response(winnerPlace, images, matchingUsers, null);
    }

    @Transactional
    public void add(WorldcupDto.Request dto) {
        Place place = placeRepo.findById(dto.getPlaceId())
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));
        AppUser user = null;

        if (dto.getUserId() != null) {
            user = userRepo.findById(dto.getUserId())
                    .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        }

        Worldcup worldcup = dto.toEntity(user, place);
        worldcupRepo.save(worldcup);
    }

    private Map<Place, Integer> getPlacesOrderedByOccurrence() {
        List<Worldcup> allWorldcups = worldcupRepo.findAll();
        Map<Place, Integer> placeCountMap = new HashMap<>();

        for (Worldcup worldcup : allWorldcups) {
            Place place = worldcup.getPlace();
            placeCountMap.put(place, placeCountMap.getOrDefault(place, 0) + 1);
        }

        return placeCountMap;
    }

    public void insertData(int count) {
        List<Place> places = placeRepo.findAll();
        List<AppUser> users = userRepo.findAll();

        for (int i = 0; i < count; i++) {
            int randomPlaceIndex = random.nextInt(places.size());
            int randomUserIndex = random.nextInt(users.size());

            AppUser user = users.get(randomUserIndex);
            Place place = places.get(randomPlaceIndex);

            WorldcupDto.Request dto = new WorldcupDto.Request(place.getId(), user.getId());
            add(dto);
        }
    }
}
