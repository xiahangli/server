package server.effectivejava._35_使用实例属性代替ordial序号;

/**
 * 枚举单独抽出成类
 */
public enum Ensemble {
    SOLO(1),DUTE(2),TRIO(3),QUARTET(4),QUINTET(5);
    private final int ordial;


    Ensemble(int ordial){
        this.ordial = ordial;
    }

    public int getOrdial() {
        return ordial;
    }
}
