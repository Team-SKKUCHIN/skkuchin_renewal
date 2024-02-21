package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import skkuchin.service.domain.User.Sms;

public interface SmsRepo extends JpaRepository<Sms, Long> {
    Sms findByPhoneNumber(String phoneNumber);
}
