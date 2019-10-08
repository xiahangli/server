package server.dp.strategy;

/**
 * 操作策略
 */
public class Context {
    //默认策略
    private CalculateStrategy strategy = new BusStrategy();
    public static void main(String[] args) {

    }


    public void setStrategy(CalculateStrategy strategy){
        this.strategy = strategy;
    }


    /**
     * 对实现隐藏
     */

    public int calculatePrice(int km){
       return strategy.calculatePrice(km);
    }
}
