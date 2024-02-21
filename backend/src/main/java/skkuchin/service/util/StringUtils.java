package skkuchin.service.util;

public class StringUtils {
    public static String getPostWord(String str, String firstVal, String secondVal) {
        try {
            char laststr = str.charAt(str.length() - 1);
            if (laststr < 0xAC00 || laststr > 0xD7A3) {
                return str;
            }

            int lastCharIndex = (laststr - 0xAC00) % 28;

            if (lastCharIndex > 0) {
                if (firstVal.equals("으로") && lastCharIndex == 8) {
                    str += secondVal;
                } else {
                    str += firstVal;
                }
            } else {
                str += secondVal;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return str;
    }
}
