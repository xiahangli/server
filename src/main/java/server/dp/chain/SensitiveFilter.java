package server.dp.chain;

public class SensitiveFilter implements Filter {

    @Override
    public void doFilter(Request request, Response response, Filter chainFilter) {
        String requestFilterStr = request.getRequestStr()
                .replace("法伦功", "flg")
                .replace("政府", "zf");
        request.setRequestStr(requestFilterStr);

        chainFilter.doFilter(request, response, chainFilter);

        String responseFilterStr = response.getResponseStr()
                .replace("法伦功", "---")
                .replace("政府", "--");
        response.setResponseStr(responseFilterStr + "|SensitiveFilter");
    }
}

