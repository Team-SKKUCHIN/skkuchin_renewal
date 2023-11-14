package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleImage;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Profile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class ArticleDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotBlank
        private String title;

        @NotNull
        @JsonProperty
        private ArticleType articleType;

        @NotBlank
        private String content;

        private boolean anonymous;
        private List<MultipartFile> images;

        public Article toEntity(AppUser user) {
            return Article.builder()
                    .user(user)
                    .content(content)
                    .title(title)
                    .articleType(articleType)
                    .date(LocalDateTime.now())
                    .anonymous(anonymous)
                    .build();
        }

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PutRequest {

        @NotBlank
        private String title;

        @NotNull
        @JsonProperty
        private ArticleType articleType;

        @NotBlank
        private String content;

        private boolean anonymous;
        private List<String> urls;
        private List<MultipartFile> images;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @NoArgsConstructor
    public static class Response {

        private Long id;
        private ArticleType articleType;
        private String tagType;
        private String title;
        private String content;
        @JsonProperty
        private Long userId;

        private String nickname;

        @JsonProperty
        private Profile userImage;
        @JsonProperty
        private String displayTime;
        @JsonProperty
        private Long articleLikeCount;
        @JsonProperty
        private Long commentCount;

        @JsonProperty
        private boolean userLiked;

        @JsonProperty
        private String originalTime;

        private boolean anonymous;
        private List<String> images;

        public Response(Article article, List<Comment> comments, List<ArticleLike> articleLikes, List<ArticleImage> images, AppUser appUser) {
            this.id = article.getId();
            this.articleType = article.getArticleType();
            this.tagType = article.getArticleType().getLabel();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.userId = article.getUser().getId();
            this.nickname = article.getUser().getNickname();
            this.userImage = article.getUser().getImage();
            this.displayTime = formatDate(article.getDate());
            this.commentCount = comments.stream().count();
            this.articleLikeCount = articleLikes.stream().count();
            this.userLiked = calculateUserLiked(articleLikes, appUser);
            this.anonymous = article.isAnonymous();
            this.originalTime = originalFormatDate(article.getDate());
            this.images = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
        }

        private boolean calculateUserLiked(List<ArticleLike> articleLikes, AppUser appUser) {
            for (ArticleLike like : articleLikes) {
                if (like.getUser().getId().equals(appUser.getId())) {
                    return true;
                }
            }

            return false;
        }

        private String formatDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            long diff = ChronoUnit.MINUTES.between(date, now);
            if (diff < 1) {
                return "방금 전";
            } else if (diff < 60) {
                return diff + "분 전";
            } else if (diff < 1440) {
                return (diff / 60) + "시간 전";
            } else if (diff < 2880) {
                return "어제";
            } else if (date.getYear() == now.getYear()) {
                return date.format(DateTimeFormatter.ofPattern("M월 d일", Locale.KOREAN));
            } else {
                return date.format(DateTimeFormatter.ofPattern("yyyy. M. d.", Locale.KOREAN));
            }
        }

        private String originalFormatDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateFormatter;

            if (date.getYear() >= now.getYear()) {
                // 올해 이후 작성된 댓글
                dateFormatter = DateTimeFormatter.ofPattern("MM/dd HH:mm", Locale.KOREAN);
            } else {
                // 올해 이전 작성된 댓글
                dateFormatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일 HH:mm", Locale.KOREAN);
            }
            return date.format(dateFormatter);
        }
    }
}
