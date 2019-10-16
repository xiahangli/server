package server.effectivejava._44优先使用标准的函数式接口;

import java.util.function.Supplier;

/**
 * A为模板类
 */
abstract class A {
    public void print() {
        System.out.println("A");
        doSubThing();
    }

    abstract void doSubThing();
}

/**
 * 子类重写了模板方法
 */
class B extends A {
    @Override
    void doSubThing() {
        System.out.println("B");
    }
}
// lambda
class AA {
    private Supplier<String> supplier;

    /**
     * 提供一个构造器，这个构造器接收一个函数对象，可以实现类似模板方法的功能
     * @param supplier
     */
    public AA(Supplier<String> supplier) {
        this.supplier = supplier;
    }

    public void print() {
        System.out.println("A");
        //todo supply有一个get方法，这里调用AA构造器中的lambda表达是的值
        System.out.println(supplier.get());
    }

    public static void main(String[] args) {
        //todo 构造函数中传入，注意这里还没有生成AA对象
        AA a = new AA(() -> "B");
        a.print();
    }
}