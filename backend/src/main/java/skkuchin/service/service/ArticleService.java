package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleImage;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ArticleImageRepo;
import skkuchin.service.repo.ArticleLikeRepo;
import skkuchin.service.repo.ArticleRepo;
import skkuchin.service.repo.CommentRepo;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleService {
    private static final String CATEGORY = "article";
    private final ArticleRepo articleRepo;
    private final CommentRepo commentRepo;
    private final ArticleLikeRepo articleLikeRepo;
    private final ArticleImageRepo articleImageRepo;
    private final S3Service s3Service;

    @Transactional
    public void addArticle(AppUser appUser, ArticleDto.PostRequest dto) {
        List<ArticleImage> articleImages = new ArrayList<>();

        Article article = dto.toEntity(appUser);
        articleRepo.save(article);

        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, appUser.getUsername(),
                        Long.toString(article.getId()));
                ArticleImage articleImage = ArticleImage.builder().article(article).url(url).build();
                articleImages.add(articleImage);
            }
        }
        if (articleImages.size() > 0) {
            articleImageRepo.saveAll(articleImages);
        }
    }

    @Transactional
    public List<ArticleDto.Response> searchArticle(AppUser appUser) {

        return articleRepo.findAllByOrderByDateDesc()
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId()),
                        articleImageRepo.findByArticle(article),
                        appUser))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ArticleDto.Response> getMyArticle(AppUser appUser) {
        return articleRepo.findByUserOrderByDateDesc(appUser)
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId()),
                        articleImageRepo.findByArticle(article),
                        appUser))
                .collect(Collectors.toList());

    }

    @Transactional
    public ArticleDto.Response getSpecificArticle(Long articleId, AppUser appUser) {
        Article article = articleRepo.findById(articleId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글입니다."));

        return new ArticleDto.Response(
            article,
            commentRepo.findByArticle(article),
            articleLikeRepo.findByArticle(articleId),
            articleImageRepo.findByArticle(article),
            appUser);
    }

    @Transactional
    public void deleteArticle(Long articleId, AppUser appUser) {
        Article article = articleRepo.findById(articleId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글입니다."));

        canHandleArticle(article.getUser(), appUser);

        List<ArticleImage> existingImages = articleImageRepo.findByArticle(article);

        articleRepo.delete(article);

        for (ArticleImage existingImage : existingImages) {
            s3Service.deleteObject(existingImage.getUrl());
        }
    }

    @Transactional
    public void updateArticle(Long articleId, AppUser appUser, ArticleDto.PutRequest dto) {
        List<ArticleImage> newImages = new ArrayList<>();

        Article beforeArticle = articleRepo.findById(articleId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글입니다."));
        canHandleArticle(beforeArticle.getUser(), appUser);
        BeanUtils.copyProperties(dto, beforeArticle);
        articleRepo.save(beforeArticle);

        List<ArticleImage> existingImages = articleImageRepo.findByArticle(beforeArticle);

        // s3에 업로드 후 newImages 배열에 url 정보 저장
        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, beforeArticle.getUser().getUsername(),
                        Long.toString(beforeArticle.getId()));
                ArticleImage newImage = ArticleImage.builder().article(beforeArticle).url(url).build();
                newImages.add(newImage);
            }
        }

        if (newImages.size() > 0) {
            articleImageRepo.saveAll(newImages);
        }

        // 기존 image url 중 없어진 url 삭제
        for (ArticleImage existingImage : existingImages) {
            if (!dto.getUrls().contains(existingImage.getUrl())) {
                s3Service.deleteObject(existingImage.getUrl());
                articleImageRepo.delete(existingImage);
            }
        }
    }

    @Transactional
    public List<ArticleDto.Response> searchKeyword(String keyword, AppUser appUser) {
        List<Article> matchingArticles = articleRepo.findByTitleContainingOrContentContainingOrderByDateDesc(keyword,
                keyword);

        return matchingArticles
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId()),
                        articleImageRepo.findByArticle(article),
                        appUser))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ArticleDto.Response> getSpecificArticle(ArticleType articleType, AppUser appUser) {
        return articleRepo.findByArticleType(articleType)
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId()),
                        articleImageRepo.findByArticle(article),
                        appUser))
                .collect(Collectors.toList());
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId())
                || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("게시글 작성자 또는 관리자가 아닙니다.");
    }
}
