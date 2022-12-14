package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.SignUpForm;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Role;
import skkuchin.service.exception.DiscordException;
import skkuchin.service.exception.DuplicateException;
import skkuchin.service.exception.EmailAuthNumNotFoundException;
import skkuchin.service.mail.EmailAuth;
import skkuchin.service.mail.EmailAuthRepo;
import skkuchin.service.mail.EmailService;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.repo.UserRepo;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final EmailAuthRepo emailAuthRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean checkUsername(String username) {
        AppUser existingUser = userRepo.findByUsername(username);
        if (existingUser == null) {
            return false;
        } else return true;
    }

    @Override
    public AppUser saveUser(SignUpForm signUpForm) throws MessagingException, UnsupportedEncodingException {
        log.info("Saving new user {} to the database", signUpForm.getNickname());
        if (!signUpForm.getPassword().equals(signUpForm.getRe_password())) {
            throw new DiscordException("re_password_error");
        }
        signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        AppUser appUser = signUpForm.toEntity();
        appUser.getRoles().add(roleRepo.findByName("ROLE_USER"));
        AppUser newUser = userRepo.save(appUser);
        emailService.sendEmail(newUser.getEmail());
        return newUser;
    }

    @Override
    public void saveAdmin(SignUpForm signUpForm) {
        if (userRepo.findByUsername("admin") == null) {
            signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            AppUser appUser = signUpForm.toEntity();
            appUser.getRoles().add(roleRepo.findByName("ROLE_ADMIN"));
            appUser.emailVerifiedSuccess();
            userRepo.save(appUser);
        }
    }

    @Override
    public void saveTestUser(SignUpForm signUpForm) {
        if (userRepo.findByUsername("test") == null) {
            signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            AppUser appUser = signUpForm.toEntity();
            appUser.getRoles().add(roleRepo.findByName("ROLE_USER"));
            appUser.emailVerifiedSuccess();
            userRepo.save(appUser);
        }
    }

    public Boolean confirmEmail(EmailAuthRequestDto requestDto) {
        EmailAuth emailAuth = emailAuthRepo.findByEmailAndAuthNumAndExpireDateAfter(
                requestDto.getEmail(), requestDto.getAuthNum(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthNumNotFoundException());
        AppUser user = userRepo.findByEmail(requestDto.getEmail());
        emailAuth.useToken();
        user.emailVerifiedSuccess();
        return true;
    }

    @Override
    public void saveRole(Role role) {
        String roleName = role.getName();
        if (roleRepo.findByName(roleName) == null) {
            log.info("Saving new role {} to the database", role.getName());
            roleRepo.save(role);
        }
    }
 
    @Override
    public Role getRole(String roleName) {
        log.info("Fetching role {}", roleName);
        return roleRepo.findByName(roleName);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        AppUser user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        //user.getRoles().add(role);
        if (user.getRoles().contains(role)) {
            throw new DuplicateException("role_duplicate_error");
        } else {
            user.getRoles().add(role);
        }
    }

    @Override
    public AppUser getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching all users");

        return userRepo.findAll();
    }


}
