package skkuchin.service.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.GroupChatRequest;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ProfileStatus;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Sms;
import skkuchin.service.dto.GroupProfileDto;
import skkuchin.service.dto.MatchingUserDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.GroupChatRequestRepo;
import skkuchin.service.repo.GroupProfileRepo;
import skkuchin.service.repo.SmsRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.util.RandomDateGenerator;
import skkuchin.service.util.RandomNameGenerator;

@Service
@RequiredArgsConstructor
public class GroupProfileService {
    private final GroupProfileRepo groupProfileRepo;
    private final GroupChatRequestRepo groupChatRequestRepo;
    private final SmsRepo smsRepo;
    private final UserRepo userRepo;
    private final MatchingUserService matchingUserService;
    private final Random random = new Random();

    @Transactional
    public List<GroupProfileDto.SummaryResponse> getGroupProfileListAsNonUser() {
        return groupProfileRepo.findAll()
                .stream()
                .filter(profile -> ProfileStatus.ACTIVE.equals(profile.getStatus()))
                .sorted(Comparator.comparing(GroupProfile::getModifiedAt).reversed())
                .map(profile -> new GroupProfileDto.SummaryResponse(profile))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<GroupProfileDto.SummaryResponse> getGroupProfileListAsUser(Long userId) {
        return groupProfileRepo.findGroupProfilesExceptMine(userId)
                .stream()
                .filter(profile -> ProfileStatus.ACTIVE.equals(profile.getStatus()))
                .sorted(Comparator.comparing(GroupProfile::getModifiedAt).reversed())
                .map(profile -> new GroupProfileDto.SummaryResponse(profile))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<GroupProfileDto.SummaryResponse> getMyGroupProfileList(Long userId) {
        return groupProfileRepo.findMyGroupProfiles(userId)
                .stream()
                .filter(profile -> ProfileStatus.ACTIVE.equals(profile.getStatus()))
                .sorted(Comparator.comparing(GroupProfile::getModifiedAt).reversed())
                .map(profile -> new GroupProfileDto.SummaryResponse(profile))
                .collect(Collectors.toList());
    }

    @Transactional
    public GroupProfileDto.FullResponse getGroupProfile(Long profileId) {
        GroupProfile groupProfile = groupProfileRepo.findById(profileId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹 프로필입니다"));
        return new GroupProfileDto.FullResponse(groupProfile);
    }

    @Transactional
    public void createGroupProfile(GroupProfileDto.PostRequest dto, AppUser user) {
        List<Sms> smsList = smsRepo.findByUser(user);

        if (user.getMatching() == null) {
            throw new CustomRuntimeException("매칭 프로필을 생성해주시기 바랍니다");
        }
        if (groupProfileRepo.findMyGroupProfiles(user.getId()).size() == 5) {
            throw new CustomRuntimeException("그룹 프로필은 5개 이하로만 생성 가능합니다");
        }
        if (!user.getNickname().startsWith("test") && (smsList.isEmpty() || !smsList.get(0).isVerified())) {
            throw new CustomRuntimeException("전화번호가 등록되지 않았습니다");
        }
        groupProfileRepo.save(dto.toEntity(user));
    }

    @Transactional
    public void updateGroupProfile(Long userId, Long groupProfileId, GroupProfileDto.PatchRequest dto) {
        GroupProfile existingGroupProfile = groupProfileRepo.findById(groupProfileId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹 프로필입니다"));

        if (existingGroupProfile.getFriend1().getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }
        existingGroupProfile.setModifiedAt(LocalDateTime.now());
        existingGroupProfile.setGroupIntroduction(dto.getGroupIntroduction());
        existingGroupProfile.setFriend1Introduction(dto.getFriend1Introduction());
        existingGroupProfile.setFriend2Introduction(dto.getFriend2Introduction());
        existingGroupProfile.setFriend3Introduction(dto.getFriend3Introduction());
        groupProfileRepo.save(existingGroupProfile);
    }

    @Transactional
    public void inactivateGroupProfile(Long userId, Long groupProfileId) {
        GroupProfile existingGroupProfile = groupProfileRepo.findById(groupProfileId)
                .orElseThrow(() -> new CustomValidationApiException("존재하지 않는 그룹 프로필입니다"));

        if (existingGroupProfile.getFriend1().getId() != userId) {
            throw new CustomRuntimeException("비정상적인 접근입니다");
        }

        List<GroupChatRequest> groupChatRequests = groupChatRequestRepo
                .findGroupChatRequestsByGroupProfileId(groupProfileId);

        boolean isRemain = groupChatRequests
                .stream()
                .anyMatch(request -> request.getReceiver().getFriend1().getId() == userId
                        && request.getStatus() == ResponseType.HOLD);
        if (isRemain) {
            throw new CustomRuntimeException("보류 중인 신청이 존재합니다");
        }

        groupChatRequests
                .stream()
                .filter(request -> request.getSender().getFriend1().getId() == userId
                        && request.getStatus() == ResponseType.HOLD)
                .forEach(request -> {
                    groupChatRequestRepo.delete(request);
                });

        existingGroupProfile.setModifiedAt(LocalDateTime.now());
        existingGroupProfile.setStatus(ProfileStatus.INACTIVE);
        groupProfileRepo.delete(existingGroupProfile);
    }

    @Transactional
    public String getRandomName(AppUser user) {
        if (user.getGender() == null) {
            throw new CustomRuntimeException("성별을 등록하지 않았습니다");
        }

        String groupName;
        int maxAttempts = 10;
        int attempts = 0;
        while (attempts < maxAttempts) {
            groupName = RandomNameGenerator.getRandomName(user.getGender());
            GroupProfile existingProfile = groupProfileRepo.findByGroupName(groupName);
            if (existingProfile == null) {
                return groupName;
            }
            attempts++;
        }
        throw new CustomRuntimeException("유일한 그룹 이름을 생성할 수 없습니다.");
    }

    @Transactional
    public void saveGroupProfiles(int count) {
        List<MatchingUserDto.Response> users = matchingUserService.getUserProfileListAsNonUser();

        for (int i = 1; i <= count; i++) {
            MatchingUserDto.Response matchingUser = users.get(random.nextInt(users.size()));
            AppUser user = userRepo.findById(matchingUser.getId()).orElseThrow();
            String randomName = getRandomName(user);
            Boolean isDateOn = random.nextBoolean();

            GroupProfileDto.PostRequest groupProfile = new GroupProfileDto.PostRequest(
                    randomName,
                    String.format("%s 팀입니다. 잘 부탁드려요", randomName),
                    String.format("%s 입니다. 잘 부탁드려요", user.getNickname()),
                    random.nextInt(24 - 10 + 1) + 10,
                    Major.values()[random.nextInt(Major.values().length)],
                    "친구2입니다. 잘 부탁드려요",
                    random.nextInt(24 - 10 + 1) + 10,
                    Major.values()[random.nextInt(Major.values().length)],
                    "친구3입니다. 잘 부탁드려요",
                    isDateOn ? LocalDate.now() : null,
                    isDateOn ? RandomDateGenerator.getRandomDate() : null);
            groupProfileRepo.save(groupProfile.toEntity(user));
        }
    }
}
