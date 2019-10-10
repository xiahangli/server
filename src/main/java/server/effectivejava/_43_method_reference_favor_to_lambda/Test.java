package server.effectivejava._43_method_reference_favor_to_lambda;

import java.util.HashMap;
import java.util.Map;

public class Test {
    public static void main(String[] args) {
        //这里map必须限定他的key,value为integer类型
        Map<Integer, Integer> map = new HashMap<>();
        int key = 11;
        map.merge(key, 1, (count, incr) -> count + incr);

//        map.merge()
//        map.merge(key, 1, Integer::sum);
//        Map<Integer, Integer> map = new HashMap<>();
//        map.forEach((key, value) -> map.merge(key, -1, Integer::sum));
    }
}