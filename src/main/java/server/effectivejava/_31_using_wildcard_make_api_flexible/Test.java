package server.effectivejava._31_using_wildcard_make_api_flexible;

import java.util.*;

/**
 * Created by Administrator on 2019/10/10.
 */
public class Test {
    public static void main(String[] args) throws Exception {
        /**
         * ResizingArrayStack<Number> stack = new ResizingArrayStack<>();
         ResizingArrayStack<Number> another = new ResizingArrayStack<>();
         ResizingArrayStack<Integer> stack1 = new ResizingArrayStack<>();
         ResizingArrayStack<Object> stack2 = new ResizingArrayStack<>();
         //从常理来说，integer是number的字类，照道理是应该能加到容器中的，为了更大程度的扩展容器的使用，使用wildcard通配符
         Iterable<Integer> iterable = Arrays.asList(1, 3, 4);
         stack.pushAll(iterable);
         Iterable<Double> iterable1 = Arrays.asList(1.1,1.2);
         stack.pushAll(iterable1);
         //        stack.popAll(another);
         //        stack.popAll(stack1);//？ super T 不能是子类，也就是说？ super T 用于消费者，消费者无法判断具体的类型，只能根据边界来确定
         stack.popAll(stack2);
         System.out.println();
         Iterator<Number> iterator = another.iterator();
         while (iterator.hasNext()){
         Number next = iterator.next();
         System.out.println("=============="+next);
         }
         */
        List<Integer> list  =new ArrayList<>();
        list.add(1);
        list.add(30);
        swap(list,0,1);
        int i=0;
    }



//    public static <E> void swap (List<E> list,int i ,int j){}

    //如果类型参数在方法声明中只出现一次，用通配符?(无限定的通配符或限定的通配符)替换T
    public static  void swap( List<?> list,int i,int j){
//        list.set(i,list.set(j,list.get(i)));
        swapHelper(list,i,j);

    }

    /**
     * 隐藏实现细节
     * @param list
     * @param i
     * @param j
     * @param <T>
     */
    private static <T> void swapHelper(List<T> list,int i,int j){
        list.set(j,list.set(i,list.get(j)));
    }

    /**
     * wildcard 不能用在具体的类型方法上，但是添加null是可以的
     * @param collection
     */
    public void testWildCard(Collection<?> collection){
//        Collection collection1 = null;
//        collection.add("12");d
        collection.add(null);//todo 添加null是可以的
        collection.contains(12);
        collection.containsAll(new ArrayList<>());//可以
        collection.remove("12");//可以删除，因为类型为Object
    }
}
