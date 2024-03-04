package skkuchin.service.util;

import java.util.Random;

import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.User.AppUser;

public class RandomNameGenerator {

    private static final String[] modifiers1 = {
            "명륜", "혜화", "중도", "성균관", "킹고", "에스카라", "명륜당",
            "비천당", "은행잎", "스꾸", "성균", "1398", "금잔디", "600주년",
            "귀여운", "깜찍한", "멋있는", "화려한", "행복한", "러블리", "재밌는",
            "유쾌한", "마돌", "싸코스", "한잔더", "주항아리"
    };

    private static final String[] modifiers2 = {
            "율전", "수원", "중도", "성균관", "킹고", "에스카라", "명륜당",
            "비천당", "은행잎", "스꾸", "성균", "1398", "금잔디", "600주년",
            "귀여운", "깜찍한", "멋있는", "화려한", "행복한", "러블리", "재밌는",
            "유쾌한", "먹고", "알촌", "디도", "봉수육"
    };

    private static final String[] femaleGroups = {
            "블랙핑크", "트와이스", "있지", "레드벨벳", "에스파", "르세라핌",
            "아이브", "빅마마", "2ne1", "걸스데이", "유교걸", "공주님"
    };

    private static final String[] maleGroups = {
            "라이즈", "몬스타엑스", "제로베이스원", "BTS", "세븐틴", "스트레이키즈",
            "투바투", "비틀즈", "노을", "2PM", "유교보이", "왕자님", "어벤져스", "히어로즈", "F4"
    };

    public static String getRandomName(AppUser user) {
        Random rand = new Random();
        Campus campus = CampusUtils.findCampus(user.getMajor());
        String modifier;
        String group;
        if (campus == Campus.명륜) {
            modifier = modifiers1[rand.nextInt(modifiers1.length)];
        } else {
            modifier = modifiers2[rand.nextInt(modifiers2.length)];
        }
        if (user.getGender() == Gender.남성) {
            group = maleGroups[rand.nextInt(maleGroups.length)];
        } else {
            group = femaleGroups[rand.nextInt(femaleGroups.length)];
        }
        return modifier + " " + group;
    }
}
