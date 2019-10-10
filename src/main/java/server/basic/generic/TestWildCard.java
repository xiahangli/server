package server.basic.generic;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by Administrator on 2019/9/27.
 */
public class TestWildCard {
    public static void main(String[] args) {
    }

    /**
     * wildcard 不能用在具体的类型方法上，但是添加null是可以的
     * @param collection
     */
    public void testWildCard(Collection<?> collection){
//        Collection collection1 = null;
//        collection.add("12");d
        collection.add(null);//添加null是可以的
        collection.contains(12);
        collection.containsAll(new ArrayList<>());//可以
        collection.remove("12");//可以删除，因为类型为Object
    }
}
