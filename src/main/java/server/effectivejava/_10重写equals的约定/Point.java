package server.effectivejava._10重写equals的约定;

/**
 * Created by Administrator on 2019/10/16.
 */
public class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 重写equals语义
     * @param obj
     * @return
     */
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Point) {//当p.equals(cp),因为cp为Point的子类，满足
            Point p = (Point) obj;
            return p.x==this.x&& p.y == this.y;//认为相等，忽略了颜色的考虑
        }else{
            return false;
        }
    }
}
