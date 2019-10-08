package server.basic.concurrent;

/**
 * Created by henry on 2019/8/25.
 */
@ThreadSafe
@Immutable
public class Point {

    public final int x,y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

}
