package server.basic.concurrent;

import javax.servlet.*;
import java.io.IOException;
import java.math.BigInteger;

/**
 * Created by Administrator on 2019/8/14.
 */
public class VolatileCachedFactorizer implements Servlet {
    private volatile OneValueCache cache = new OneValueCache(null, new BigInteger[]{});

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        BigInteger i = extractEvent(servletRequest);
        BigInteger[] factors = cache.getFactors(i);
        System.out.println("reques ===="+servletRequest.toString());
        if (factors == null) {
            factors = factor(i);
            cache = new OneValueCache(i, factors);
            System.out.println("cache ====="+cache.toString());
        }

        encodeIntoResponse(servletResponse, factors);
    }

    void encodeIntoResponse(ServletResponse resp, BigInteger[] factors) {
    }

    private BigInteger extractEvent(ServletRequest req) {
        return new BigInteger("7");
    }

    BigInteger[] factor(BigInteger i) {
        // Doesn't really factor
        return new BigInteger[]{i};
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
