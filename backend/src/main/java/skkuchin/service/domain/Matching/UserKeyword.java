package skkuchin.service.domain.Matching;

import lombok.*;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "user_keyword", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "user_id", "keyword_id" })
})
public class UserKeyword {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id", nullable = false)
        private AppUser user;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "keyword_id", nullable = false)
        private Keyword keyword;
}
