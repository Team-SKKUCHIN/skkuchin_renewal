package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import skkuchin.service.domain.Chat.PersonalChatRequest;

public interface PersonalChatRequestRepo extends JpaRepository<PersonalChatRequest, Long> {
    @Query("SELECT r FROM PersonalChatRequest r WHERE (:userId IN (r.sender.id, r.receiver.id)) AND r.status <> 'EXPIRED'")
    List<PersonalChatRequest> findValidPersonalChatRequests(@Param("userId") Long userId);
}
