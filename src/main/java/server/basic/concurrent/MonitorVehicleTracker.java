package server.basic.concurrent;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * 使用监视器的模式
 */
public class MonitorVehicleTracker {

    private final Map<String,MutablePoint> locations;


    public MonitorVehicleTracker(Map<String, MutablePoint> locations){
        this.locations = deepCopy(locations);
    }


    /**
     * 深度拷贝中拥有的对象是两份
     * @param locations
     * @return
     */
    private static Map<String, MutablePoint> deepCopy(Map<String, MutablePoint> locations) {
        Map<String, MutablePoint> result = new HashMap<>();
        for (String id :
                locations.keySet()) {//通过Map的keySet进行遍历
            result.put(id,new MutablePoint(locations.get(id)));//keySet代表了一组key
        }
        //注意这里的unmodifiableMap的实现也是通过final字段实现的
        return Collections.unmodifiableMap(result);

    }





    //
}
