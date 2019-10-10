package server.effectivejava._33_consider_typesafe_heterogeneous_containers;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Created by Administrator on 2019/10/10.
 */
public class Favorites {
    private Map<Class<?>,Object> favorites = new HashMap<>();

    /**
     *参数化Class 类类型，而不是容器
     * @param type 不能为null
     * @param instance
     * @param <T>
     */
    public <T> void putFavorite(Class<T> type , T instance){
        favorites.put(Objects.requireNonNull(type),instance);
    }
    public <T> T getFavorite(Class<T> type){
        //Class.cast方法做类型转换
        Object o = favorites.get(type);
        return type.cast(o);
    }
}
