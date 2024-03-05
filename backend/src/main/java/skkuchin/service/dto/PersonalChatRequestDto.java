package skkuchin.service.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Chat.PersonalChatRequest;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.Matching.Mbti;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Profile;
import skkuchin.service.util.CampusUtils;
import skkuchin.service.util.KeywordUtils;

public class PersonalChatRequestDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotNull
        @JsonProperty
        private Long receiverId;

        @NotBlank
        private String link;

        public PersonalChatRequest toEntity(AppUser sender, AppUser receiver) {
            return PersonalChatRequest.builder()
                    .sender(sender)
                    .receiver(receiver)
                    .link(this.link)
                    .status(ResponseType.HOLD)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ReplyRequest {
        @NotNull
        private ResponseType status;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class BaseResponse {
        @JsonProperty
        private Long requestId;

        @JsonProperty
        private LocalDateTime createdAt;

        @JsonProperty
        private Long senderId;

        @JsonProperty
        private Long receiverId;

        private String nickname;

        private Campus campus;

        private Gender gender;

        private Major major;

        private Profile image;

        @JsonProperty
        private int studentId;

        private Mbti mbti;

        private Map<String, List<String>> keywords;

        private String introduction;

        private ResponseType status;

        public BaseResponse(PersonalChatRequest personalChatRequest, AppUser user, List<UserKeyword> keywords) {
            this.requestId = personalChatRequest.getId();
            this.createdAt = personalChatRequest.getCreatedAt();
            this.senderId = personalChatRequest.getSender().getId();
            this.receiverId = personalChatRequest.getReceiver().getId();
            this.nickname = user.getNickname();
            this.campus = CampusUtils.findCampus(user.getMajor());
            this.gender = user.getGender();
            this.major = user.getMajor();
            this.image = user.getImage();
            this.studentId = user.getStudentId();
            this.mbti = user.getMbti();
            this.keywords = KeywordUtils.getKeywordMap(keywords);
            this.introduction = user.getIntroduction();
            this.status = personalChatRequest.getStatus();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ConfirmedResponse extends BaseResponse {
        @JsonProperty
        private LocalDateTime confirmedAt;

        private String link;

        public ConfirmedResponse(PersonalChatRequest personalChatRequest, AppUser user, List<UserKeyword> keywords) {
            super(personalChatRequest, user, keywords);
            this.confirmedAt = personalChatRequest.getConfirmedAt();
            this.link = personalChatRequest.getLink();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Responses {
        @JsonProperty
        private List<BaseResponse> receiveRequests;

        @JsonProperty
        private List<BaseResponse> sendRequests;

        @JsonProperty
        private List<ConfirmedResponse> confirmedRequests;

        public Responses(
                List<BaseResponse> receiveResponses,
                List<BaseResponse> sendResponses,
                List<ConfirmedResponse> confirmedResponses) {
            this.receiveRequests = receiveResponses;
            this.sendRequests = sendResponses;
            this.confirmedRequests = confirmedResponses;
        }
    }
}
