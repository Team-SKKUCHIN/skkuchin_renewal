package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;
import skkuchin.service.domain.User.AppUser;

public interface WorldcupRepo extends JpaRepository<Worldcup, Long> {
    @Query("SELECT w.place FROM Worldcup w " +
            "ORDER BY (SELECT COUNT(w2) FROM Worldcup w2 WHERE w2.place.id = w.place.id) DESC")
    List<Place> findAllOrderedByPlaceCount();

    @Query("SELECT w.user FROM Worldcup w " +
            "WHERE w.place.id = :placeId " +
            "AND w.user.matching = true " +
            "ORDER BY RAND() " +
            "LIMIT 3")
    List<AppUser> findRandomMatchingUsersByPlaceId(@Param("placeId") Long placeId);
}
