package server.effectivejava._10重写equals的约定;

import java.awt.*;

/**
 * Created by Administrator on 2019/10/16.
 */
public class ColorPoint extends Point {
    private final Color color;

    public ColorPoint(int x, int y, Color color) {
        super(x, y);
        this.color = color;
    }
//    public ColorPoint(int x,int y,Color color) {
//        super(x,y);
//        this.color = color;
//
//    }


//    /**
//     * 破坏了对称性
//     * @param obj
//     * @return
//     */
//    @Override
//    public boolean equals(Object obj) {
//        if (!(obj instanceof ColorPoint))return false;
//        return super.equals(obj) && ((ColorPoint) obj).color == this.color;
//    }


    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Point)) return false;
        //不可能不是point的子类
//        obj是normal point,那么比较他们的地址是否相等
       if (!(obj instanceof ColorPoint)){
           return obj.equals(this);
       }
        //obj是color point
        return super.equals(obj)&& ((ColorPoint) obj).color == this.color;
    }

    public static void main(String[] args) {
        Point p = new Point(12, 13);
        ColorPoint cp = new ColorPoint(12, 13, Color.RED);
        boolean equals = p.equals(cp);
        boolean equals1 = cp.equals(p);
        System.out.println();
    }
}
