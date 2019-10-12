package server.basic.generic;

/**
 * 泛型数组
 * @param <T>
 */
public class GenericArray<T> {
    //私有属性中，永远不会返回给客户端或传递给任何其他方法
    private T[] array;

    @SuppressWarnings("unchecked")
    public GenericArray(int sz) {
        array = (T[]) new Object[sz];
    }

    public void put(int index, T item) {
        array[index] = item;
    }

    public T get(int index) {
        return array[index];
    }

    // Method that exposes the underlying representation:
    public T[] rep() {
        return array;
    }

    public static void main(String[] args) {
        GenericArray<Integer> gai =
                new GenericArray<Integer>(10);
        // This causes a ClassCastException:,原因是泛型在编译时擦除
        gai.put(1,3);
        //
        Integer[] ia = gai.rep();
        // This is OK:
        Object[] oa = gai.rep();
    }
}
