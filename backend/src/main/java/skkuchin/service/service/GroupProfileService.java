package skkuchin.service.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.GroupChatRequest;
import skkuchin.service.domain.Chat.GroupProfile;
import skkuchin.service.domain.Chat.ProfileStatus;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.GroupProfileDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.GroupChatRequestRepo;
import skkuchin.service.repo.GroupProfileRepo;

@Service
@RequiredArgsConstructor
public class GroupProfileService {
    private final GroupProfileRepo groupProfileRepo;
    private final GroupChatRequestRepo groupChatRequestRepo;

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
        if (groupProfileRepo.findMyGroupProfiles(user.getId()).size() >= 5) {
            throw new CustomRuntimeException("그룹 프로필은 5개 이하로만 생성 가능합니다");
        }
        if (user.getSmsLists().size() == 0 || !user.getSmsLists().get(0).getIsVerified()) {
            throw new CustomRuntimeException("전화번호가 등록되지 않았습니다");
        }
        if (dto.getGroupIntroduction().length() > 30 || dto.getFriend1Introduction().length() > 30
                || dto.getFriend2Introduction().length() > 30
                || dto.getFriend3Introduction().length() > 30) {
            throw new CustomRuntimeException("소개 문구는 30자 이내로 작성해주시기 바랍니다");
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
        if (dto.getGroupIntroduction().length() > 30 || dto.getFriend1Introduction().length() > 30
                || dto.getFriend2Introduction().length() > 30
                || dto.getFriend3Introduction().length() > 30) {
            throw new CustomRuntimeException("소개 문구는 30자 이내로 작성해주시기 바랍니다");
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

        groupChatRequests
                .stream()
                .filter(request -> request.getReceiver().getFriend1().getId() == userId
                        && request.getStatus() == ResponseType.HOLD)
                .forEach(request -> {
                    request.setStatus(ResponseType.REFUSE);
                    groupChatRequestRepo.save(request);
                });

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
}
