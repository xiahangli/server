package server.basic.generic;



/**
 * Created by Administrator on 2019/10/10.
 */
class Generic<T> {

}

public class ArrayOfGeneric {
    static final int size = 100;
    //数组将跟踪他们的实际类型，而这个类型是在数组被创建的时候确定的
    static Generic<Integer>[] gia;
    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        //即使gia已经被转型为Generic<Integer>[]，但是这个信息只存在与编译期，在运行的时候，它仍旧是Object数组
        gia = (Generic<Integer>[]) new Object[size];
        System.out.println(gia.getClass().getSimpleName());
        gia[0] = new Generic<>();
        gia[1] = (Generic<Integer>) new Object();
//        gia[2]=new Generic<Double>();
    }
}
