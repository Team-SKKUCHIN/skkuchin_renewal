package skkuchin.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import skkuchin.service.dto.UserDto;
import skkuchin.service.domain.User.Profile;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Role;
import skkuchin.service.service.*;

@EnableScheduling
@SpringBootApplication
public class ServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServiceApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(
			UserService userService,
			PlaceService placeService,
			ImageService imageService,
			KeywordService keywordService,
			NoticeService noticeService,
			GroupProfileService groupProfileService,
			WorldcupService worldcupService,
			GroupChatRequestService groupChatRequestService,
			PersonalChatRequestService personalChatRequestService) {
		return args -> {
			userService.saveRole(Role.builder().name("ROLE_USER").build());
			userService.saveRole(Role.builder().name("ROLE_ADMIN").build());

			userService.saveAdmin(new UserDto.SignUpForm("스꾸친관리자", "admin", "12341234", "12341234", 16, Major.경영학과,
					Profile.DEFAULT1));
			userService.saveTestUser(
					new UserDto.SignUpForm("테스트", "test", "12341234", "12341234", 20, Major.건축학과, Profile.DEFAULT2));

			// String path = System.getProperty("user.dir") +
			// "\\src\\main\\java\\skkuchin\\service\\data\\"; // Window 공통 경로
			String path = System.getProperty("user.dir") + "/src/main/java/skkuchin/service/data/"; // Mac 공통 경로

			// String path = "C:\\Users\\sunny\\OneDrive\\바탕 화면\\스프링
			// 연습\\skkuchin_renewal\\backend\\src\\main\\java\\skkuchin\\service\\data\\";
			// // 병준 경로

			try {
				placeService.insertData(path);
				imageService.insertData();
				keywordService.insertData(path);
				userService.saveTestMatchingUsers(100);
				groupProfileService.saveGroupProfiles(10);
				groupChatRequestService.insertData();
				personalChatRequestService.insertData();
				worldcupService.insertData(100);
				noticeService.insertData();
			} catch (Exception e) {
				System.out.println(e);
			}
		};
	}
}