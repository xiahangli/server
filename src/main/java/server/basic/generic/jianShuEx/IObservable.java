package server.basic.generic.jianShuEx;

interface IObservable<T> {
    T call(T t);

    /**
     * 映射变换
     * @param func1
     * @param <R>
     * @return
     */
   <R> Observable<R> map(Func1<T, R> func1);

   IObservable<T> doOnNext(Action<T> a);
}