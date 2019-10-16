package server.effectivejava._44优先使用标准的函数式接口;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 由于有了lambda，模板方法（子类重写父类方法定制特有的行为）可以用函数式接口替换，这样就不用多一个类了
 */
public class MyLinkedHashMap<K, V>
        extends LinkedHashMap<K, V> {

    /**
     * 重写removeEldestEntry，可以用作缓存，为什么，
     * 因为每次将新的key值加入到map中都会调用该方法，当此方法返回true的时候，map将删除传递给方法的最久的条目，
     * 这里调用size方法，可以得到当前的size,当size>100的时候，返回true,map会将最老（可用使用accessOrder及根据访问的order来删除）
     * 的条目删除，保证map中只有100条
     * @param eldest
     * @return
     */
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size()>100;
    }
}
