package server.basic.generic.jianShuEx;//package basic.generic.jianShuEx;
//
///**
// * Created by henry on 2018/3/15.
// */
////public class Observable<T> implements IObservable<T> {
////
////    T t;
////
//////    @Override
//////    public <T> T call(T t) {//这个类中只有该方法识别泛型
//////        return null;
//////    }
////
////    public static void main(String[] args) {
////        //将泛型声明在接口上或声明在类上,如果你写在方法上，编译器不通过
//////        IObservable<Student> observer = new Observable();
//////        Student student = observer.call();
////        //类类型声明泛型，可以识别该类所有地方的泛型，这里构造函数需要一个泛型,所以我们需要指定泛型的类型，这里我们可以指定为Student
////        //如果不指定类型，那么系统会给出警告
////        Observable observable2 = new Observable<Student>(new Student());
////        Student student2 = (Student) observable2.call(new Student());
////    }
////
////    public Observable(T t) {
////        this.t = t;
////    }
////
////    @Override
////    public T call(T t) {
////        return null;
////    }
////}
//
////class ObservableMthod implements IObservableMethod {
////    @Override
////    public <T> T call(T t) {
////        return null;
////    }
////}
//
//
