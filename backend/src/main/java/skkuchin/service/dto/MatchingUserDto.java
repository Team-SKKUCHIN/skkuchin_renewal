package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.Matching.Keyword;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.Matching.Mbti;
import skkuchin.service.domain.User.Profile;
import skkuchin.service.util.CampusUtils;
import skkuchin.service.util.KeywordUtils;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

public class MatchingUserDto {

    @Getter
    public static class Request {
        @NotNull
        private Gender gender;
        @Size(min = 3)
        @Size(max = 8)
        @NotNull
        private List<String> keywords;
        @NotBlank
        private String introduction;
        @NotNull
        private Mbti mbti;

        public UserKeyword toUserKeywordEntity(AppUser user, Keyword keyword) {
            return UserKeyword.builder()
                    .user(user)
                    .keyword(keyword)
                    .build();
        }
    }

    @Getter
    public static class StatusRequest {
        @NotNull
        private Boolean status;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private String nickname;
        private Profile image;
        private Major major;
        @JsonProperty
        private int studentId;
        private Mbti mbti;
        private Boolean matching;
        private Gender gender;
        private Map<String, List<String>> keywords;
        private String introduction;
        private Campus campus;

        public Response(AppUser user, List<UserKeyword> keywords) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.image = user.getImage();
            this.major = user.getMajor();
            this.studentId = user.getStudentId();
            this.mbti = user.getMbti();
            this.matching = user.getMatching();
            this.gender = user.getGender();
            this.keywords = KeywordUtils.getKeywordMap(keywords);
            this.introduction = user.getIntroduction();
            this.campus = CampusUtils.findCampus(user.getMajor());
        }
    }
}
