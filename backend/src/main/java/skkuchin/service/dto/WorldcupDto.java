package skkuchin.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Category;
import skkuchin.service.domain.Map.Gate;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;
import skkuchin.service.domain.User.AppUser;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

public class WorldcupDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotNull
        private Long placeId;
        private Long userId;

        public Worldcup toEntity(AppUser user, Place place) {
            return Worldcup.builder()
                    .place(place)
                    .user(user)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private String name;
        private Category category;
        @JsonProperty
        private String detailCategory;
        private Campus campus;
        private Gate gate;
        private List<String> images;
        private Float winningRate;
        private List<MatchingUserDto.Response> users;

        public Response(Place place, List<Image> images, List<MatchingUserDto.Response> matchingUsers,
                Float winningRate) {
            this.id = place.getId();
            this.name = place.getName();
            this.category = place.getCategory();
            this.detailCategory = place.getDetailCategory();
            this.campus = place.getCampus();
            this.gate = place.getGate();
            this.images = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
            this.winningRate = winningRate;
            this.users = matchingUsers;
        }
    }
}
