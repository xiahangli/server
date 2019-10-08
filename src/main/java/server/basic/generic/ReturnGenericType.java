package server.basic.generic;

/**
 * 泛型类，当返回一个T类型的时候，这时候通过泛型可以指定到擦除的边界
 */
public class ReturnGenericType<T extends HasF> {

    private T obj;

    /**
     * 构造函数，在调动的时候指定具体类型
     * @param obj
     */
    public ReturnGenericType(T obj) {
        this.obj = obj;
    }

    /**
     * 返回的时候就指定了具体的参数类型，即T被替换成了HasF
     * @return
     */
    public T get(){
        return obj;
    }
}
