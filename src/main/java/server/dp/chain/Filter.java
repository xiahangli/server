package server.dp.chain;

/**
 * Created by xia on 2018/11/6.
 */
public interface Filter {
    void doFilter(Request req, Response rsp, Filter filter);
}
