package server.effectivejava._17最小化可变性;

/**
 * Created by Administrator on 2019/10/18.
 */
public final  class Complex {
    private final double re;
    private final double im;

    public Complex(double re, double im) {
        this.re = re;
        this.im = im;
    }
    public double realPart(){
        return re;
    }

    public double imagePart(){
        return im;
    }

    /**
     * 新建对象而不是修改原来的对象
     * @param complex
     * @return
     */
   public Complex  plus(Complex complex){
//       return new Complex(re.)

   return null;}
}
