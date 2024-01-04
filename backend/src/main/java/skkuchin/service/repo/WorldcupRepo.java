package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;

public interface WorldcupRepo extends JpaRepository<Worldcup, Long> {
    List<Worldcup> findByPlace(Place place);
}
