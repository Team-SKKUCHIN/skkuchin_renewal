package skkuchin.service.mail;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.mail.EmailAuth;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepo extends JpaRepository<EmailAuth, Long> {
    //Optional<EmailAuth> findValidAuthByEmail(String email, String authNum, LocalDateTime currentTime);
    Optional<EmailAuth> findByEmailAndAuthNumAndExpireDateAfter(String email, String authNum, LocalDateTime now);
    Optional<EmailAuth> findByEmailAndAuthNum(String email, String authNum);
}
