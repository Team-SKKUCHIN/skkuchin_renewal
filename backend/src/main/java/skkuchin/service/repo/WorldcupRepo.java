package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Worldcup;
import skkuchin.service.domain.User.AppUser;

public interface WorldcupRepo extends JpaRepository<Worldcup, Long> {
    @Query(value = "SELECT p.* " +
            "FROM Place p " +
            "LEFT JOIN Worldcup w ON p.id = w.place_id " +
            "GROUP BY p.id " +
            "ORDER BY COUNT(w.place_id) DESC", nativeQuery = true)
    List<Place> findAllOrderedByPlaceCount();

    @Query(value = "SELECT u.* " +
            "FROM Worldcup w " +
            "INNER JOIN AppUser u ON w.user_id = u.id " +
            "WHERE w.place_id = :placeId " +
            "AND w.matching = true " +
            "ORDER BY RAND() " +
            "LIMIT 3", nativeQuery = true)
    List<AppUser> findRandomMatchingUsersByPlaceId(@Param("placeId") Long placeId);
}
