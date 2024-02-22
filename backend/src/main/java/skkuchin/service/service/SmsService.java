package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Sms;
import skkuchin.service.dto.SmsDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.SmsRepo;
import skkuchin.service.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SmsService {
    private static final Pattern PHONE_PATTERN = Pattern.compile("^010[0-9]{8}$");
    private static final int CODE_LENGTH = 6;
    private final SmsRepo smsRepo;
    private final UserRepo userRepo;
    private final DefaultMessageService messageService;

    @Value("${nurigo.phone.from}")
    private String from;

    @Transactional
    public void enrollPhoneNumber(SmsDto.PostRequest dto) {
        String phoneNumber = dto.getPhoneNumber();
        String verificationCode = generateVerificationCode();
        AppUser user = userRepo.findByUsername(dto.getUsername());

        if (!PHONE_PATTERN.matcher(phoneNumber).matches()) {
            throw new CustomRuntimeException("전화번호가 올바르지 않습니다");
        }

        if (user == null) {
            throw new CustomRuntimeException("먼저 회원가입을 진행해주시기 바랍니다");
        }

        List<Sms> smsList = smsRepo.findByUser(user);
        if (smsList.size() > 0) {
            throw new CustomRuntimeException("이미 전화번호를 등록하였습니다");
        }

        Sms existingSms = smsRepo.findByPhoneNumber(phoneNumber);
        if (existingSms != null && existingSms.isVerified()) {
            throw new CustomRuntimeException("사용 중인 번호입니다");
        }
        smsRepo.save(dto.toEntity(user, verificationCode));
        sendSms(phoneNumber, String.format("스꾸친 본인확인 인증번호는 [%s]입니다.", verificationCode));
    }

    @Transactional
    public void updatePhoneNumber(AppUser user, SmsDto.PutRequest dto) {
        String phoneNumber = dto.getPhoneNumber();
        String verificationCode = generateVerificationCode();
        Sms existingSms = smsRepo.findByPhoneNumber(phoneNumber);

        if (!PHONE_PATTERN.matcher(phoneNumber).matches()) {
            throw new CustomRuntimeException("전화번호가 올바르지 않습니다");
        }

        List<Sms> smsList = smsRepo.findByUser(user);
        if (smsList.size() == 0) {
            throw new CustomRuntimeException("전화번호가 등록되지 않았습니다");
        }

        if (smsList.get(0).getPhoneNumber().equals(phoneNumber)) {
            throw new CustomRuntimeException("동일한 전화번호입니다");
        }

        if (existingSms != null && existingSms.isVerified()) {
            throw new CustomRuntimeException("사용 중인 전화번호입니다");
        }

        Sms mySms = smsList.get(0);
        mySms.setPhoneNumber(dto.getPhoneNumber());
        mySms.setVerificationCode(verificationCode);
        mySms.setVerified(false);
        mySms.setAlarmOn(false);
        mySms.setModifiedAt(LocalDateTime.now());
        smsRepo.save(mySms);
        sendSms(phoneNumber, String.format("스꾸친 본인확인 인증번호는 [%s]입니다.", verificationCode));
    }

    @Transactional
    public void verifyPhoneNumber(SmsDto.VerificationRequest dto) {
        String phoneNumber = dto.getPhoneNumber();
        Sms existingSms = smsRepo.findByPhoneNumber(phoneNumber);

        if (!PHONE_PATTERN.matcher(phoneNumber).matches()) {
            throw new CustomRuntimeException("전화번호가 올바르지 않습니다");
        }

        if (existingSms == null) {
            throw new CustomRuntimeException("전화번호가 등록되지 않았습니다");
        }

        if (existingSms.isVerified()) {
            throw new CustomRuntimeException("이미 인증된 전화번호입니다");
        }

        if (!existingSms.getVerificationCode().equals(dto.getVerificationCode())) {
            throw new CustomRuntimeException("잘못된 인증번호입니다");
        }

        existingSms.setVerificationCode(null);
        existingSms.setVerified(true);
        existingSms.setAlarmOn(true);
        existingSms.setModifiedAt(LocalDateTime.now());
        smsRepo.save(existingSms);
    }

    @Transactional
    public void deletePhoneNumber(AppUser user) {
        List<Sms> smsList = smsRepo.findByUser(user);
        if (smsList.size() == 0) {
            throw new CustomRuntimeException("전화번호가 등록되지 않았습니다");
        }
        smsRepo.delete(smsList.get(0));
    }

    @Transactional
    private String generateVerificationCode() {
        String numbers = "0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(numbers.length());
            sb.append(numbers.charAt(index));
        }
        return sb.toString();
    }

    @Transactional
    public void sendSms(String to, String text) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText(text);

        try {
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException exception) {
            System.out.println(exception.getFailedMessageList());
            log.error(exception.getMessage(), exception);
            throw new CustomRuntimeException("Solapi 에러 발생");
        } catch (Exception exception) {
            log.error(exception.getMessage(), exception);
            throw new CustomRuntimeException("Solapi 에러 발생");
        }
    }
}
