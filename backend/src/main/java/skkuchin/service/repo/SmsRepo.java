package skkuchin.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Sms;

public interface SmsRepo extends JpaRepository<Sms, Long> {
    Sms findByPhoneNumber(String phoneNumber);

    List<Sms> findByUser(AppUser user);
}
