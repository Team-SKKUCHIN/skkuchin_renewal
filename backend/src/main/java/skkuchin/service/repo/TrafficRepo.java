package skkuchin.service.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import skkuchin.service.domain.User.Content;
import skkuchin.service.domain.User.Traffic;

public interface TrafficRepo extends JpaRepository<Traffic, Long> {
    Optional<Traffic> findByContent(Content content);
}
