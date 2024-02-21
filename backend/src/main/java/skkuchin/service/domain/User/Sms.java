package skkuchin.service.domain.User;

import lombok.*;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "phone_number" })
})
public class Sms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @CreationTimestamp
    private LocalDateTime modifiedAt;

    @Column(name = "phone_number", unique = true, nullable = false)
    private String phoneNumber;

    private String verificationCode;

    @Column(columnDefinition = "BIT DEFAULT TRUE", nullable = false)
    private Boolean isVerified;

    @Column(columnDefinition = "BIT DEFAULT TRUE", nullable = false)
    private Boolean isAlarmOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;
}