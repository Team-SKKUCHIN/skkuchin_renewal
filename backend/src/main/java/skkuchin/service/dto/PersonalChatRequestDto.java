package skkuchin.service.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

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
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

public class PersonalChatRequestDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotNull
        @JsonProperty
        private Long senderId;

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
        @JsonProperty
        private Long requestId;

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

        @JsonProperty
        private int studentId;

        private Mbti mbti;

        private List<String> keywords;

        private String introduction;

        private ResponseType status;

        public BaseResponse(PersonalChatRequest personalChatRequest, AppUser user, List<String> keywords) {
            this.requestId = personalChatRequest.getId();
            this.createdAt = personalChatRequest.getCreatedAt();
            this.senderId = personalChatRequest.getSender().getId();
            this.receiverId = personalChatRequest.getReceiver().getId();
            this.nickname = user.getNickname();
            this.campus = findCampus(user.getMajor());
            this.gender = user.getGender();
            this.major = user.getMajor();
            this.studentId = user.getStudentId();
            this.mbti = user.getMbti();
            this.keywords = keywords;
            this.introduction = user.getIntroduction();
            this.status = personalChatRequest.getStatus();
        }

        private Campus findCampus(Major major) {
            EnumSet<Major> majors = EnumSet.allOf(Major.class);
            List<Major> majorList = new ArrayList<>();
            majorList.addAll(majors);

            if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
                return Campus.명륜;
            } else {
                return Campus.율전;
            }
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ConfirmedResponse extends BaseResponse {
        @JsonProperty
        private LocalDateTime confirmedAt;

        private String link;

        public ConfirmedResponse(PersonalChatRequest personalChatRequest, AppUser user, List<String> keywords) {
            super(personalChatRequest, user, keywords);
            this.confirmedAt = personalChatRequest.getConfirmedAt();
            this.link = personalChatRequest.getLink();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Responses {
        @JsonProperty
        private List<BaseResponse> receiveResponses;

        @JsonProperty
        private List<BaseResponse> sendResponses;

        @JsonProperty
        private List<ConfirmedResponse> confirmedResponses;

        public Responses(
                List<BaseResponse> receiveResponses,
                List<BaseResponse> sendResponses,
                List<ConfirmedResponse> confirmedResponses) {
            this.receiveResponses = receiveResponses;
            this.sendResponses = sendResponses;
            this.confirmedResponses = confirmedResponses;
        }
    }
}
