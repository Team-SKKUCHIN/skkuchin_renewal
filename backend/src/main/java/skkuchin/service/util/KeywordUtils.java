package skkuchin.service.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import skkuchin.service.domain.Matching.UserKeyword;

public class KeywordUtils {

    public static Map<String, List<String>> getKeywordMap(List<UserKeyword> keywords) {
        Map<String, List<String>> keywordMap = new HashMap<>();

        for (UserKeyword userKeyword : keywords) {
            String category = userKeyword.getKeyword().getCategory();
            String name = userKeyword.getKeyword().getName();

            if (!keywordMap.containsKey(category)) {
                keywordMap.put(category, new ArrayList<>());
            }
            keywordMap.get(category).add(name);
        }
        return keywordMap;
    }
}
