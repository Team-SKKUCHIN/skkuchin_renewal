package skkuchin.service.domain.Forum;

public enum ArticleType {
    WHAT_TO_EAT("뭐 먹을까요"),
    ETC("기타"),
    TOGETHER("같이 먹어요"),
    GIVE_RECOMMEND("맛집 추천해요"),
    GET_RECOMMEND("맛집 추천 받아요");

    private final String label;

    private ArticleType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
