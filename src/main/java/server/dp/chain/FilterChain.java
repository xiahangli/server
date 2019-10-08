package server.dp.chain;

import java.util.ArrayList;
import java.util.List;

public class FilterChain implements Filter {
    public List<Filter> mFilters = new ArrayList<>();
    public int index = 0;


    public FilterChain addFilter(Filter filter){
        mFilters.add(filter);
        return this;
    }


    @Override
    public void doFilter(Request request, Response response, Filter chain) {
        if(index == mFilters.size()) return;
        Filter filter = mFilters.get(index);
        index ++;
        filter.doFilter(request, response, this);
    }
    public static void main(String[] argus) {
        //要被过滤的内容
        String content = "<scrpit> 法伦功一定要灭掉，尼玛的，你妈的。中国政府真的太好了，呵呵，呵呵";
        Request request = new Request();
        request.setRequestStr(content);
        Response response = new Response();
        response.setResponseStr(content);
        //新建一个『过滤链条』
        FilterChain filterChain = new FilterChain();
        //在过滤链条中添加过滤规则
        filterChain.addFilter(new FuckFilter())
                .addFilter(new SensitiveFilter());

        //过滤后的内容
        filterChain.doFilter(request, response, filterChain);
        //输出内容
        System.out.println(request.getRequestStr());
        System.out.println(response.getResponseStr());

    }

}

