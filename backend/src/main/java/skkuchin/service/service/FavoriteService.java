package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.FavoriteDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FavoriteService {
    private final FavoriteRepo favoriteRepo;
    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;
    private final ReviewTagRepo reviewTagRepo;
    private final UserRepo userRepo;


    @Transactional
    public void write(AppUser user, FavoriteDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();

       // System.out.println("place.getId() = " + place.getId());
        Favorite favorite = dto.toEntity(user, place);
        isFavoriteDuplicate(user,favorite.getPlace());
        favoriteRepo.save(favorite);
    }


    @Transactional
    public List<FavoriteDto.Response> getMyFavorite(AppUser user) {

        return favoriteRepo.findByUser(user)
                .stream()
                .map(favorite -> new FavoriteDto.Response(
                        favorite,
                        imageRepo.findByPlace(favorite.getPlace()).stream().collect(Collectors.toList()),
                        reviewRepo.findByPlace(favorite.getPlace()).stream().collect(Collectors.toList()),
                        getTop3TagsByPlace(favorite.getPlace())
                )).collect(Collectors.toList());
    }


    @Transactional
    public void delete(Long favoriteId, Long userId) {
        Favorite favorite = favoriteRepo.findById(favoriteId).orElseThrow();
        favoriteRepo.delete(favorite);


    }

    private List<Tag> getTop3TagsByPlace(Place place) {
        List<Review> reviews = reviewRepo.findByPlace(place);
        Map<Tag, Long> tagsCount = new HashMap<>();

        for (Review review : reviews) {
            List<ReviewTag> reviewTags = reviewTagRepo.findByReview(review);
            for (ReviewTag reviewTag : reviewTags) {
                Tag tag = reviewTag.getTag();
                tagsCount.put(tag, tagsCount.getOrDefault(tag, 0L) + 1);
            }
        }

        return tagsCount.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .limit(3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    private void isFavoriteDuplicate(AppUser user, Place place) {
        List<Favorite> favorites = favoriteRepo.findByUser(user);
        System.out.println(place.getId());

        for (Favorite favorite : favorites) {
                if(place.getId() == favorite.getPlace().getId()){
                    throw new IllegalArgumentException("?????? ????????? ?????? ??????????????? ?????? ????????????.");

                }
        }
    }

}

