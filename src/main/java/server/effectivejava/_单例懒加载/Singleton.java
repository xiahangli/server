package server.effectivejava._单例懒加载;

/**
 * Created by Administrator on 2019/10/18.
 */
public class Singleton {

   static class SingletonHolder  {
       //Singleton类加载的时候这个内部类不会加载
        static  Singleton HOLDER  = new Singleton();
   }

    public Singleton getInstance(){
        //访问，若是第一次，那么久初始化这个Singleton对象
        return SingletonHolder.HOLDER;
    }
}
