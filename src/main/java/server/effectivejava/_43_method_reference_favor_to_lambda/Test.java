package server.effectivejava._43_method_reference_favor_to_lambda;

import java.util.HashMap;
import java.util.Map;

public class Test {
    public static void main(String[] args) {
        Map map
                = new HashMap<>();
        int key = 11;
        int cout =
        map.merge(key, 1, (count, incr) -> count + incr);
    }
}