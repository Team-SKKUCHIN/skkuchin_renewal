package skkuchin.service.domain.Chat;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Report;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomId;
    private String roomName;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatSession> chatSessions = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private AppUser user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private AppUser user2;

    @Enumerated(EnumType.STRING)
    private ResponseType response;


    private LocalDateTime expireDate;

    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean isUser1Blocked;


    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean isUser2Blocked;

    @Column(columnDefinition = "BIT DEFAULT TRUE")
    private boolean isUser1AlarmOn;

    @Column(columnDefinition = "BIT DEFAULT TRUE")
    private boolean isUSer2AlarmOn;

    @PrePersist
    public void setDate() {
        LocalDateTime now = LocalDateTime.now();
        this.expireDate = now.plusDays(2);
        /*this.expireDate = now.plusMinutes(1);*/
    }

    // 신고 관련 매핑입니다 지우지 마세요

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Appointment> appointments = new ArrayList<>();
}