package server.basic.reference;

import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;
import java.lang.ref.WeakReference;

public class ReferenceTest {

    public static void main(String[] args) {
//   1、     创建referenceQueue
        ReferenceQueue queue = new ReferenceQueue();
        A a = new A();
//2、创建弱引用，此时状态为active,并且reference.pending为空，当前refernce.queue = 上面创建的queue,并且queue.next=null,并关联到RQ
        WeakReference<A> wrA = new WeakReference<A>(a, queue);
        System.out.println(wrA);
        a = null;

        if (wrA.get() == null) {
            System.out.println("a对象进入垃圾回收流程");
        } else {
            System.out.println("a对象尚未被回收" + wrA.get());
        }

        // 垃圾回收,由于是弱引用对象，只有弱引用指向该对象A，所以回收该对象A，并且置于Pending状态，此时reference状态为PENDING
        System.gc();

//        referenceHandler从pending中取下该元素，并将该元素放入到queue中（在reference被回收的时候，reference会被添加到queue中），此时reference状态为enqueued态，

//        当从quue里面取出该元素，则变为inactive状态
        try {
            Reference fefernce = queue.remove();
            System.out.println(fefernce);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (wrA.get() == null) {
            System.out.println("a对象进入垃圾回收流程");
        } else {
            System.out.println("a对象尚未被回收" + wrA.get());
        }

    }
}

class A {

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println("in A finalize");
    }

}