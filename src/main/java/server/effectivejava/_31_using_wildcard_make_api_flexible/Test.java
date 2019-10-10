package server.effectivejava._31_using_wildcard_make_api_flexible;

import java.util.Arrays;
import java.util.Iterator;

/**
 * Created by Administrator on 2019/10/10.
 */
public class Test {
    public static void main(String[] args) throws Exception {
        ResizingArrayStack<Number> stack = new ResizingArrayStack<>();
        ResizingArrayStack<Number> another = new ResizingArrayStack<>();
        ResizingArrayStack<Integer> stack1 = new ResizingArrayStack<>();
        ResizingArrayStack<Object> stack2 = new ResizingArrayStack<>();
//stack.push(1);
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
//        String pop = stack.pop();
    }
}
