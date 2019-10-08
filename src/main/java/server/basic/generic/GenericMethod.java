package server.basic.generic;

/**
 * Created by henry on 2018/3/15.
 * 泛型方法
 */
public class GenericMethod {

    /**
     * 无返回值（void）的情况
     * @param string
     * @param <T> 无返回值的占位符
     */
    public static  <T> void printString(T string){

        System.out.println("printString: "+string);
    }


    /**
     *
     * @param <T> 占位符号，表示泛型方法
     * @return T的话返回类型可以是任意类型
     */
    public static  <T>  T  getString(T string){
        return (T) (string+", you are  bitch!");
    }

    public static void main(String[] args) {
        String yoyo = GenericMethod.getString("yoyo");
        System.out.println(yoyo);
    }
}
