package server.basic.concurrent;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 使用委托的车厢追踪器返回的是一个不可修改但是却实时的车辆位置视图，即如果A线程getLocations方式得到unmodifiableMap，然后B线程修改了某些点，
 * 那么返回A的线程将看到这些修改，这可能是好事，也可能是坏事，具体看应用场景
 *
 *
 * 如果需要一个不发生变化的车辆视图，那么getLocations可以返回对locations这个Map对象的一个浅拷贝（Shallow copy），由于Map的内容是不可变的,
 * 因此只需要复制Map的结构，而不需要复制map的内容
 *
 *
 */
public class DelegatingVehicleTracker {
    private final ConcurrentHashMap<String,Point> locations;
    private final Map<String,Point> unmodifiableMap;

    public DelegatingVehicleTracker(ConcurrentHashMap<String, Point> locations, Map<String, Point> unmodifiableMap) {
        this.locations = new ConcurrentHashMap<>(locations);//新的对象
        this.unmodifiableMap = Collections.unmodifiableMap(unmodifiableMap);
    }

    /**
     * 由于Point的不可变性，这里getLocations方法不需要同步
     * @return
     */
    public Map<String,Point> getLocations(){
        return unmodifiableMap;
    }


    /**
     * 只复制map的数据结构，返回的是static变量
     * @return
     */
    public Map<String,Point > getShallowCopyOfLocations(){
        return Collections.unmodifiableMap(new HashMap<>(locations));
    }


    public Point getLocation(String id){
        return locations.get(id);
    }

    public void setLocation(String id,int x,int y){
        //当key(id)或者value为null，这里value不可能为null
        if(locations.replace(id,new Point(x,y)) == null){
            throw new IllegalArgumentException("invalid vehilchle name: "+id);
        }
    }
}
