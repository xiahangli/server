package server.ds.map;//package ds.map;
//
//import java.util.AbstractMap;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Set;
//
///**
// * Created by henry on 2017/7/24.
// */
////public class Map<K, V> extends AbstractMap<K, V> {
////
////    private List<K> keys = new ArrayList<>();
////
////    private List<V> values = new ArrayList<>();
////
////    @Override
////    public Set<Entry<K, V>> entrySet() {
////        return null;
////    }
////
////    public V put(K key,V value){
////        V oldV = get(key);
////        if (keys.contains(key)){
////            values.set(keys.indexOf(oldV),oldV);
////        }else{
////            keys.add(key);
////            values.add(keys.indexOf(key),value);
////        }
////        return null;
////    }
//
//}
