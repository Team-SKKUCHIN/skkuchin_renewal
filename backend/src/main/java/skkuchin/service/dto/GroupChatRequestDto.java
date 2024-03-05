package skkuchin.service.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.GroupChatRequest;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.Matching.Gender;

public class GroupChatRequestDto {

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

        public GroupChatRequest toEntity(GroupProfile sender, GroupProfile receiver) {
            return GroupChatRequest.builder()
                    .sender(sender)
                    .receiver(receiver)
                    .link(this.link)
                    .status(ResponseType.HOLD)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ReplyRequest {
        @NotNull
        private ResponseType status;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ProfileResponse {
        private Long id;

        @JsonProperty
        private String groupName;

        private Gender gender;

        @JsonProperty
        private boolean isMine;

        public ProfileResponse(GroupProfile groupProfile, boolean isMine) {
            this.id = groupProfile.getId();
            this.groupName = groupProfile.getGroupName();
            this.gender = groupProfile.getFriend1().getGender();
            this.isMine = isMine;
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class BaseResponse {
        @JsonProperty
        private Long requestId;

        @JsonProperty
        private LocalDateTime createdAt;

        @JsonProperty
        private ProfileResponse senderProfile;

        @JsonProperty
        private ProfileResponse receiverProfile;

        private ResponseType status;

        public BaseResponse(GroupChatRequest groupChatRequest, ProfileResponse senderProfile,
                ProfileResponse receiverProfile) {
            this.requestId = groupChatRequest.getId();
            this.createdAt = groupChatRequest.getCreatedAt();
            this.senderProfile = senderProfile;
            this.receiverProfile = receiverProfile;
            this.status = groupChatRequest.getStatus();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ConfirmedResponse extends BaseResponse {
        @JsonProperty
        private LocalDateTime confirmedAt;

        private String link;

        public ConfirmedResponse(GroupChatRequest groupChatRequest, ProfileResponse senderProfile,
                ProfileResponse receiverProfile) {
            super(groupChatRequest, senderProfile, receiverProfile);
            this.confirmedAt = groupChatRequest.getConfirmedAt();
            this.link = groupChatRequest.getStatus() == ResponseType.ACCEPT ? groupChatRequest.getLink() : null;
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
