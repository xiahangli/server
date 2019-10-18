package server.effectivejava._44优先使用标准的函数式接口;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 由于有了lambda，模板方法（子类重写父类方法定制特有的行为）可以用函数式接口替换，这样就不用多一个类了
 */
public class MyLinkedHashMap<K, V>
        extends LinkedHashMap<K, V> {

    public MyLinkedHashMap(int initialCapacity, float loadFactor) {
        super(initialCapacity, loadFactor);
    }

    public MyLinkedHashMap(int initialCapacity) {
        super(initialCapacity);
    }

    public MyLinkedHashMap() {


    }


    public MyLinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder) {
        super(initialCapacity, loadFactor, accessOrder);
    }

    /**
     * 重写removeEldestEntry，可以用作缓存，为什么，
     * 因为每次将新的key值加入到map中都会调用该方法，当此方法返回true的时候，map将删除传递给方法的最久的条目，
     * 这里调用size方法，可以得到当前的size,当size>100的时候，返回true,map会将最老（可用使用accessOrder及根据访问的order来删除）
     * 的条目删除，保证map中只有100条
     *
     * @param eldest
     * @return
     */


    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > 2;
    }

    public static void main(String[] args) {
        EldestEntryRemovalFunction<String, Integer> eldestEntryRemovalFunction = (map, eldest) -> map.size() > 100;

        /**
         * 调用三个参数的构造函数
         */
//        MyLinkedHashMap<Integer,Integer> integerIntegerMyLinkedHashMa=new MyLinkedHashMap<>(2,0.75f,true);
//        integerIntegerMyLinkedHashMa.put(1,1);
//        integerIntegerMyLinkedHashMa.put(2,2);
//        integerIntegerMyLinkedHashMa.put(34,124230);
//        integerIntegerMyLinkedHashMa.put(341,12341240);
//        integerIntegerMyLinkedHashMa.put(343,122430);
//        integerIntegerMyLinkedHashMa.put(344,1234520);
//        integerIntegerMyLinkedHashMa.put(345,12452730);
        //上面的代码最终保存最下面两个，因为容量配置的是2，而且accessOrder访问模式开启
//        MyLinkedHashMap<Integer,Integer> integerIntegerMyLinkedHashMa=new MyLinkedHashMap<>(5,0.75f,true);
//        //todo
//        integerIntegerMyLinkedHashMa.put(1,1);
//        integerIntegerMyLinkedHashMa.put(2,2);
//        integerIntegerMyLinkedHashMa.put(34,124230);
//        integerIntegerMyLinkedHashMa.put(1,1);
//        integerIntegerMyLinkedHashMa.put(343,122430);
//        integerIntegerMyLinkedHashMa.put(344, 1234520);
//        integerIntegerMyLinkedHashMa.put(345,12452730);
        //上面代码因为1曾在中途活跃过，那么就会排在2之后，虽然1先加入，但是删除是后删除


    }
}
