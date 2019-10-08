package server.dp.chain;

/**
 * Created by xia on 2018/11/6.
 */
public class FuckFilter implements Filter{
    @Override
    public void doFilter(Request request, Response response, Filter chainFilter) {
        String requestFilterStr = request.getRequestStr()
                .replace("尼玛", "xx")
                .replace("你妈", "xx");
        request.setRequestStr(requestFilterStr);

        chainFilter.doFilter(request, response, chainFilter);
//
        String responseFilterStr = response.getResponseStr()
                .replace("尼玛", "++")
                .replace("你妈", "++");
        response.setResponseStr(responseFilterStr + "|FuckFilter");
    }

}
