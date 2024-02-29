package skkuchin.service.dto;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Sms;

public class SmsDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotBlank
        private String username;

        @NotBlank
        @JsonProperty
        private String phoneNumber;

        public Sms toEntity(AppUser user, String verificationCode) {
            return Sms.builder()
                    .phoneNumber(this.phoneNumber)
                    .verificationCode(verificationCode)
                    .user(user)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PutRequest {
        @NotBlank
        @JsonProperty
        private String phoneNumber;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class VerificationRequest {
        @NotBlank
        @JsonProperty
        private String phoneNumber;

        @NotBlank
        @JsonProperty
        private String verificationCode;
    }
}
