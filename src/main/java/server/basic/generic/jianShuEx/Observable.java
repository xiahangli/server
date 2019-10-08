package server.basic.generic.jianShuEx;

class Observable<T> implements IObservable<T> {

    private T t;

    private Observable(T t) {
        this.t = t;
    }


    /**
     * @param t
     * @param <T>
     * @return 返回类型可以是 Observable2也可以是IObservable2
     */
    public static <T> Observable<T> create(T t) {
        return new Observable<T>(t);
    }

    @Override
    public T call(T t) {
        return null;
    }


    /**
     * 将一个处理T类型数据的Observable变换成处理R类型的Observable
     * @param func1
     * @param <R>
     * @return
     */
    @Override
    public <R> Observable<R> map(Func1<T, R> func1) {
        //分两步
        //a. 把当前的数据变换成R
        //b.创建处理R数据的类并返回
       Observable<R> ob = Observable.create(func1.call(t));
        return ob;
    }


    /**
     * 处理下一个事件序列
     * @param a
     * @return
     */
    @Override
    public Observable<T> doOnNext(Action<T> a) {
        a.callAction(t);//action处理的数据类型必定是T t类型
        return this;
    }

    public static void main(String[] args) {
//        Observable2.create(new Student());//给定一个Student，返回观察着Student的对象
        Student student = new Student();
        final Teacher teacher = new Teacher();
//        System.out.println("创建好student :" );
        //将学生通过某种规则转换成teacher
        //思路，做一个接口，传入学生类型，返回老师类型，由于我们这里不一定是学生或者老师，为了抽象，使用T,R
        //


        //Observable是被观察者对象
        Observable<Teacher> map = Observable.create(student).map(new Func1<Student, Teacher>() {//学生类型变换成老师类型
            @Override
            public Teacher call(Student s) {
                System.out.println("student hashcode : " + s);
                System.out.println("teacher hashcode : " + teacher);
                return teacher;
            }
        });


        map


                .doOnNext(new Action<Teacher>() {
            @Override
            public void callAction(Teacher teacher) {
                System.out.println("teacher hashcode : " + teacher);
            }

//            @Override
//            public void callAction(Student student) {
//
//            }
        });
    }


}