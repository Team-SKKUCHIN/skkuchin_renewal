package skkuchin.service.util;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.User.Major;

public class CampusUtils {

    public static Campus findCampus(Major major) {
        EnumSet<Major> majors = EnumSet.allOf(Major.class);
        List<Major> majorList = new ArrayList<>();
        majorList.addAll(majors);

        if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
            return Campus.명륜;
        } else {
            return Campus.율전;
        }
    }
}
