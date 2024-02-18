package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import skkuchin.service.domain.Chat.GroupProfile;

public interface GroupProfileRepo extends JpaRepository<GroupProfile, Long> {
    @Query("SELECT p FROM GroupProfile p WHERE p.friend1.id <> :userId")
    List<GroupProfile> findGroupProfilesExceptMine(@Param("userId") Long userId);

    @Query("SELECT p FROM GroupProfile p WHERE p.friend1.id = :userId")
    List<GroupProfile> findMyGroupProfiles(@Param("userId") Long userId);
}
