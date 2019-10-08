package server.basic.array;

/**
 * Created by Administrator on 2019/9/7.
 */
public class Array {
    public static void main(String[] args) {
//        double[] d = new double[]{1, 2, 3};
//        double[] e = new double[3];
//        for (int i = 0; i < e.length; i++) {
//            e[i] = d[i] + 1;
//        }
//        for (int i = 0; i < d.length; i++) {
//            System.out.println(d[i]);
//            System.out.println(e[i]);
//        }

//        B[] a = new B[2];
//        B[] b = a;
//        for (int i = 0; i < a.length; i++) {
//            b[i] = new B(i);
//        }
//        for (int i = 0; i < b.length; i++) {
//            System.out.println(a[i].c);
//            System.out.println(b[i].c);
//        }


//        B[] a = new B[2];
//        for (int i = 0; i < a.length; i++) {
//            a[i] = new B(i);
//        }
//            B[] b = new B[2];
//        for (int i = 0; i < b.length; i++) {
//            b[i] = new B(i+3);//a,b的数据是独立的，因为是不同对象的
//        }
//        for (int i = 0; i < a.length; i++) {
//            System.out.println(a[i].c);
//        }
//        for (int i = 0; i < b.length; i++) {
//            System.out.println(b[i].c);
//        }


//        B[] a = new B[2];
//        for (int i = 0; i < a.length; i++) {
//            a[i] = new B(i);
//        }
//        B[] b = new B[2];
//        for (int i = 0; i < b.length; i++) {
//            b[i] = a[i];
//            b[i].c = i+3;//a数组与b数据都改变，因为是alising
//        }
//        for (int i = 0; i < a.length; i++) {
//            System.out.println(a[i].c);
//        }
//        for (int i = 0; i < b.length; i++) {
//            System.out.println(b[i].c);
//        }
    }

}

class B {
    public B(int c){
        this.c = c;
    }
     int c;
}
