package server.basic.generic;


import java.lang.reflect.Array;

/**
 * Created by Administrator on 2019/10/10.
 */
public class GenericArrayWithTypeToken<T> {
    private T[] array;

    private T[] ary1;
    /**
     *
     * @param type 类型传入，以便从擦除中恢复，使得我们可以创建需要的实际类型的数组
     * @param sz
     */
    @SuppressWarnings("unchecked")
    GenericArrayWithTypeToken(Class<T> type,int sz){
        ary1 = (T[]) new String[3];
        array = (T[]) Array.newInstance(type,sz);
    }
    public void put(int index,T item){array[index] = item;
    }
    public T get(int index){
        Class<?> componentType = array.getClass().getComponentType();
        return array[index];}

    public T[] rep(){
        Class<?> componentType = array.getClass().getComponentType();//得到array内部T的实际类型
        String typeName = array.getClass().getTypeName();
        String typeName1 = ary1.getClass().getTypeName();
        Class<?> con = ary1.getClass().getComponentType();//得到array内部T的实际类型
        return array;}

    public static void main(String[] args) {
        GenericArrayWithTypeToken<Integer> gai = new GenericArrayWithTypeToken<>(Integer.class,10);
    Integer[] ia = gai.rep();//现在返回的是Integer类型的数组

    }
}
