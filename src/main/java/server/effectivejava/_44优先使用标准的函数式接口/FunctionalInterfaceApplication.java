package server.effectivejava._44优先使用标准的函数式接口;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FunctionalInterfaceApplication<T> {


//    Page<EsUser> page1 = searchHitPage(index, query, page, EsUserUtil::searchHit2List);
//
//    public static List<EsUser> searchHit2List(SearchHit[] searchHits) {
//        List<EsUser> esUserList = new ArrayList<>();
//        try {
//            for (SearchHit hit : searchHits) {
//                EsUser esUser = objectMapper.readValue(hit.getSourceAsString(), EsUser.class);
//                esUserList.add(esUser);
//            }
//        } catch (IOException e) {
//            logger.error("searchHit转化为user失败", e);
//        }
//        return esUserList;
//    }


//    public Page<T> searchHitPage(String index, K query, Page<T> page, Function<SearchHit[], List<T>> function) {
//        if (query == null || page == null) {
//            return page;
//        }
//        //查询页数限制；防止直接分页查询10000条以外的数据
//        int maxPage = HINTS_LIMIT % page.getPageSize() == 0 ?
//                HINTS_LIMIT / page.getPageSize() : HINTS_LIMIT / page.getPageSize() + 1;
//        if (page.getCurPage() > maxPage) {
//            page.setCurPage(maxPage);
//        }
//        SearchResponse searchResponse = null;
//        try {
//            SearchRequest searchRequest = toEsQuery(query, page);
//            searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
//        } catch (IOException e) {
//            logger.error("搜索用户es基本信息失败，索引名:{}，搜索条件：{}", index, query, e);
//            return page;
//        }
//        SearchHits hits = searchResponse.getHits();
//        if (hits == null) {
//            return page;
//        }
//        SearchHit[] searchHits = hits.getHits();
//        //注意这里的apply的入参数是SearchHit[]，返回参数是
//        List<T> list = function.apply(searchHits);
//        int totalHits = hits.getTotalHits() > HINTS_LIMIT ? HINTS_LIMIT : (int) hits.getTotalHits();
//        page.setTotalSize(totalHits);
//        page.setDataList(list);
//        return page;
//    }
}
