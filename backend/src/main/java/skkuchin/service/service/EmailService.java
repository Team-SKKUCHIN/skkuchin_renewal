package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.User.EmailAuth;
import skkuchin.service.domain.User.EmailType;
import skkuchin.service.repo.EmailAuthRepo;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Random;

@Service
@EnableAsync
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private static final Long MAX_EXPIRE_TIME = 5L; //authNum 생성 5분 후 만료

    @Autowired
    JavaMailSenderImpl emailSender;
    private final EmailAuthRepo emailAuthRepo;
    private String authNum;

    //랜덤 인증 코드 생성
    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    //메일 양식 작성
    public MimeMessage createEmailForm(String email, EmailType type) throws MessagingException, UnsupportedEncodingException {
        String emailType = getEmailType(type);
        createCode();
        String setFrom = "skkuchin@gmail.com";
        String toEmail = email; //받는 사람
        String title = "SKKUCHIN "+emailType+" 이메일 인증";
        String mailContent = "<h3>["+emailType+" 이메일 인증]</h3>"
                + "<br><p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>"
                + "<a href='http://localhost:8080/api/confirmEmail/"
                + type.name().toLowerCase()
                + "?email=" + email + "&authNum=" + authNum + "' target='_blenk'>이메일 인증 확인</a>";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
        message.setSubject(title); //제목 설정
        message.setFrom(setFrom);
        message.setText(mailContent, "utf-8", "html");

        return message;
    }

    //실제 메일 전송
    @Async
    public void sendEmail(String toEmail, EmailType type) throws MessagingException, UnsupportedEncodingException {

        MimeMessage emailForm = createEmailForm(toEmail, type);
        EmailAuth emailAuth = emailAuthRepo.save(
            EmailAuth.builder()
                    .email(toEmail)
                    .authNum(authNum)
                    .type(type)
                    .isAuth(false)
                    .expireDate(LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME))
                    .build());
        emailSender.send(emailForm);
    }

    public String getEmailType(EmailType type) {
        String emailType = "";
        switch (type) {
            case SIGNUP: emailType = "회원가입";
            break;
            case PASSWORD: emailType = "비밀번호 초기화";
            break;
            case ID: emailType = "아이디 찾기";
            break;
            default: emailType = "Invalid type";
        }
        return emailType;
    }
}
