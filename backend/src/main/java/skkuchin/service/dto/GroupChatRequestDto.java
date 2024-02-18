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
import skkuchin.service.domain.Chat.GroupChatRequest;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.User.Profile;

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
        private String senderGroupName;

        @JsonProperty
        private Gender senderGender;

        @JsonProperty
        private Profile senderImage;

        @JsonProperty
        private Long receiverId;

        @JsonProperty
        private String receiverGroupName;

        @JsonProperty
        private Gender receiverGender;

        @JsonProperty
        private Profile receiverImage;

        private ResponseType status;

        public BaseResponse(GroupChatRequest groupChatRequest) {
            this.requestId = groupChatRequest.getId();
            this.createdAt = groupChatRequest.getCreatedAt();
            this.senderId = groupChatRequest.getSender().getId();
            this.senderGroupName = groupChatRequest.getSender().getGroupName();
            this.senderGender = groupChatRequest.getSender().getFriend1().getGender();
            this.senderImage = groupChatRequest.getSender().getFriend1().getImage();
            this.receiverId = groupChatRequest.getReceiver().getId();
            this.receiverGroupName = groupChatRequest.getReceiver().getGroupName();
            this.receiverGender = groupChatRequest.getReceiver().getFriend1().getGender();
            this.receiverImage = groupChatRequest.getReceiver().getFriend1().getImage();
            this.status = groupChatRequest.getStatus();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ConfirmedResponse extends BaseResponse {
        @JsonProperty
        private LocalDateTime confirmedAt;

        private String link;

        public ConfirmedResponse(GroupChatRequest groupChatRequest) {
            super(groupChatRequest);
            this.confirmedAt = groupChatRequest.getConfirmedAt();
            this.link = groupChatRequest.getLink();
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
