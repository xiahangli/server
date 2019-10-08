package server.dp.strategy;

/**
 * Created by Administrator on 2019/9/26.
 */
public interface CalculateStrategy {
    /**
     * 抽象出计算的通用策略
     * @param km
     */
    int calculatePrice(int km);
}
