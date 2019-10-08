package server.dp.strategy;

/**
 * Created by Administrator on 2019/9/26.
 */
public class SubwayStrategy implements CalculateStrategy{
    @Override
    public int calculatePrice(int km) {
        return 1;
    }
}
