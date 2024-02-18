package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import skkuchin.service.domain.Chat.GroupChatRequest;

public interface GroupChatRequestRepo extends JpaRepository<GroupChatRequest, Long> {
    @Query("SELECT r FROM GroupChatRequest r WHERE :profileId IN (r.sender.id, r.receiver.id)")
    List<GroupChatRequest> findGroupChatRequestsByGroupProfileId(@Param("profileId") Long profileId);

    @Query("SELECT r FROM GroupChatRequest r " +
            "WHERE :userId IN (r.sender.friend1.id, r.receiver.friend1.id) " +
            "AND r.status <> 'EXPIRED' " +
            "AND NOT (r.sender.friend1.id = :userId AND r.sender.status = 'INACTIVE') " +
            "AND NOT (r.receiver.friend1.id = :userId AND r.receiver.status = 'INACTIVE')")
    List<GroupChatRequest> findValidGroupChatRequests(@Param("userId") Long userId);
}
