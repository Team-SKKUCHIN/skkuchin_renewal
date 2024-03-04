package skkuchin.service.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ProfileStatus;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Profile;

public class GroupProfileDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        private Gender gender;

        @NotBlank
        @JsonProperty
        @Size(max = 12)
        private String groupName;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String groupIntroduction;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend1Introduction;

        @NotNull
        @JsonProperty
        private int friend2StudentId;

        @NotNull
        @JsonProperty
        private Major friend2Major;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend2Introduction;

        @NotNull
        @JsonProperty
        private int friend3StudentId;

        @NotNull
        @JsonProperty
        private Major friend3Major;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend3Introduction;

        @JsonProperty
        private LocalDate meetingStartDate;

        @JsonProperty
        private LocalDate meetingEndDate;

        public GroupProfile toEntity(AppUser friend1) {
            return GroupProfile.builder()
                    .groupName(this.groupName)
                    .groupIntroduction(this.groupIntroduction)
                    .friend1(friend1)
                    .friend1Introduction(this.friend1Introduction)
                    .friend2StudentId(this.friend2StudentId)
                    .friend2Major(this.friend2Major)
                    .friend2Introduction(this.friend2Introduction)
                    .friend3StudentId(this.friend3StudentId)
                    .friend3Major(this.friend3Major)
                    .friend3Introduction(this.friend3Introduction)
                    .meetingStartDate(this.meetingStartDate)
                    .meetingEndDate(this.meetingEndDate)
                    .status(ProfileStatus.ACTIVE)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PatchRequest {
        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String groupIntroduction;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend1Introduction;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend2Introduction;

        @NotBlank
        @JsonProperty
        @Size(max = 30)
        private String friend3Introduction;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class SummaryResponse {
        private Long id;

        private Gender gender;

        private Profile image;

        @JsonProperty
        private String groupName;

        @JsonProperty
        private String groupIntroduction;

        public SummaryResponse(GroupProfile groupProfile) {
            this.id = groupProfile.getId();
            this.gender = groupProfile.getFriend1().getGender();
            this.image = groupProfile.getFriend1().getImage();
            this.groupName = groupProfile.getGroupName();
            this.groupIntroduction = groupProfile.getGroupIntroduction();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class FullResponse {
        private Long id;

        private String nickname;

        private Gender gender;

        private Profile image;

        @JsonProperty
        private int friend1StudentId;

        @JsonProperty
        private Major friend1Major;

        @JsonProperty
        private String groupName;

        @JsonProperty
        private String groupIntroduction;

        @JsonProperty
        private String friend1Introduction;

        @JsonProperty
        private int friend2StudentId;

        @JsonProperty
        private Major friend2Major;

        @JsonProperty
        private String friend2Introduction;

        @JsonProperty
        private int friend3StudentId;

        @JsonProperty
        private Major friend3Major;

        @JsonProperty
        private String friend3Introduction;

        @JsonProperty
        private LocalDate meetingStartDate;

        @JsonProperty
        private LocalDate meetingEndDate;

        public FullResponse(GroupProfile groupProfile) {
            this.id = groupProfile.getId();
            this.nickname = groupProfile.getFriend1().getNickname();
            this.gender = groupProfile.getFriend1().getGender();
            this.image = groupProfile.getFriend1().getImage();
            this.friend1StudentId = groupProfile.getFriend1().getStudentId();
            this.friend1Major = groupProfile.getFriend1().getMajor();
            this.groupName = groupProfile.getGroupName();
            this.groupIntroduction = groupProfile.getGroupIntroduction();
            this.friend1Introduction = groupProfile.getFriend1Introduction();
            this.friend2StudentId = groupProfile.getFriend2StudentId();
            this.friend2Major = groupProfile.getFriend2Major();
            this.friend2Introduction = groupProfile.getFriend2Introduction();
            this.friend3StudentId = groupProfile.getFriend3StudentId();
            this.friend3Major = groupProfile.getFriend3Major();
            this.friend3Introduction = groupProfile.getFriend3Introduction();
            this.meetingStartDate = groupProfile.getMeetingStartDate();
            this.meetingEndDate = groupProfile.getMeetingEndDate();
        }
    }
}
