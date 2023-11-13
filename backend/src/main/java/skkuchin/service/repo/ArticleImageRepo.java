package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleImage;

import java.util.List;

public interface ArticleImageRepo extends JpaRepository<ArticleImage, Long> {
    List<ArticleImage> findByArticle(Article article);
}
