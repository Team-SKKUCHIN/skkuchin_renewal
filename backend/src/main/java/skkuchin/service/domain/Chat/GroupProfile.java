package skkuchin.service.domain.Chat;

import lombok.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @CreationTimestamp
    private LocalDateTime modifiedAt;

    @Column(unique = true, nullable = false)
    private String groupName;

    @Column(nullable = false)
    private String groupIntroduction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend1_id", nullable = false)
    private AppUser friend1;

    @Column(name = "friend1_introduction", nullable = false)
    private String friend1Introduction;

    @Column(name = "friend2_student_id", nullable = false)
    private int friend2StudentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "friend2_major", nullable = false)
    private Major friend2Major;

    @Column(name = "friend2_introduction", nullable = false)
    private String friend2Introduction;

    @Column(name = "friend3_student_id", nullable = false)
    private int friend3StudentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "friend3_major", nullable = false)
    private Major friend3Major;

    @Column(name = "friend3_introduction", nullable = false)
    private String friend3Introduction;

    private LocalDate meetingStartDate;

    private LocalDate meetingEndDate;

    @Enumerated(EnumType.STRING)
    private ProfileStatus status;

    @OneToMany(mappedBy = "sender")
    private List<GroupChatRequest> groupChatRequestsAsSender = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    private List<GroupChatRequest> groupChatRequestsAsReceiver = new ArrayList<>();
}
