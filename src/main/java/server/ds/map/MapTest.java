package server.ds.map;


import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by henry on 2018/3/15.
 */
public class MapTest {
    public static void main(String[] args) {
        Map<MyType, String> hm = new HashMap<MyType, String>();
        MyType mta = new MyType("aaa", "bbb");

        MyType mtb = new MyType("aaa", "bbb");

        hm.put(mta, "xxx");

        hm.put(mtb, "xxx");//实际上由于mta和mtb是两个不同的地址，有两个元素


        //迭代器遍历hashmap
        //先拿到entryset这里面是hash键值映射，根据entryset拿到迭代器
//        EntrySet
        Iterator it = hm.entrySet().iterator();
        //迭代器对hashmap遍历,它里面有重要的next方法，这个方法查看源码可以知道返回的是Map.Entry<K,V>
        while (it.hasNext()){

            Map.Entry<MyType,String> entry = (Map.Entry<MyType, String>) it.next();
            MyType key = entry.getKey();
            System.out.println("key= " +key);
            String value = entry.getValue();
            System.out.println("value= "+value);
        }

    }
}
