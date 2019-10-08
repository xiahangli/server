package server.basic.concurrent;

import java.math.BigInteger;
import java.util.Arrays;

/**
 * Created by Administrator on 2019/8/14.
 */
@Immutable
public class OneValueCache {
    private final BigInteger lastNumber;
    private final BigInteger[] lastFactors;

    /**
     * 构造函数中初始化
     * @param i
     * @param factors
     */
    public OneValueCache(BigInteger i,BigInteger[] factors){
        lastNumber = i;
        lastFactors = Arrays.copyOf(factors,factors.length);
    }

    public BigInteger[] getFactors(BigInteger i){
        if (lastNumber==null||!lastNumber.equals(i))
            return null;//没有缓存
        else //注意这里要返回另一个对象，使用Arrays.copyof实现
            return Arrays.copyOf(lastFactors,lastFactors.length);
    }

    @Override
    public String toString() {
        return "lastNumber = "+lastNumber +", lastFactors = "+lastFactors.toString();
    }
}
