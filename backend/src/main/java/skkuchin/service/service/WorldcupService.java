package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.WorldcupDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.repo.WorldcupRepo;

import java.util.List;
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

    @Transactional
    public List<WorldcupDto.Response> getAll() {
        List<Place> placeRanks = worldcupRepo.findAllOrderedByPlaceCount();

        List<WorldcupDto.Response> places = placeRanks.stream()
                .map(place -> {
                    List<Image> images = imageRepo.findByPlace(place);
                    List<AppUser> users = worldcupRepo.findRandomMatchingUsersByPlaceId(place.getId());

                    return new WorldcupDto.Response(place, images, users);
                })
                .collect(Collectors.toList());

        return places;
    }

    @Transactional
    public WorldcupDto.Response getDetail(Long placeId) {
        Place winnerPlace = placeRepo.findById(placeId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));

        List<Image> images = imageRepo.findByPlace(winnerPlace);
        List<AppUser> users = worldcupRepo.findRandomMatchingUsersByPlaceId(placeId);

        return new WorldcupDto.Response(winnerPlace, images, users);
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

}
