package skkuchin.service.domain.Map;

import lombok.*;
import skkuchin.service.domain.User.AppUser;
import java.time.LocalDateTime;
import javax.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Worldcup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "place_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Place place;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser user;

    @CreationTimestamp
    private LocalDateTime createDate;
}
