package server.basic.concurrent;

/**
 * Created by henry on 2019/8/25.
 */
@NotThreadSafe
public class MutablePoint {
    public int x,y;

    public MutablePoint(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public MutablePoint(MutablePoint p){
        this.x = p.x;
        this.y = p.y;
    }

}
