package server.effectivejava._36_使用Enum替代位属性;

import java.util.EnumSet;
import java.util.Set;

/**
 * Created by Administrator on 2019/10/18.
 */
public class Style {
    private static final int BOLD = 1<<0;
    private static final  int ITALIC = 1<<1;
    private static final int STROKE_THROUGH=1<<3;
    private static final int UNDERLINE = 1<<4;

    private int vstyle;//字的样式
    public void apply(int style){
        this.vstyle |= style;
    }

    public static void main(String[] args) {
        Style style = new Style();
        style.apply(BOLD|ITALIC);
        style.apply(STROKE_THROUGH);
        //上面生成1011,最右边是BOLD,第二是ITALIC,最左一位是STROKE_THROUGH，使用移位的运算可读性会降低，且迭代元素麻烦
        System.out.println();


    }


}

//todo 优化过后的
class Text{
     enum Styles {BOLD,ITALIC,STROKE_THROUGH,UNDERLINE;}
    //这里set可以是任何set,最好是使用enumSet
    //初始化一个啥都没有的枚举集合
    EnumSet<Styles> allStyle = EnumSet.noneOf(Styles.class);
//    Set<Styles> allStyle =EnumSet.;
    public void applyStyles(Set<Styles> set){
        //todo
        allStyle.addAll(set);
    }

//
// getStyle(){
//
//    }
    public static void main(String[] args) {
        Text text = new Text();
        EnumSet<Styles> styleses = EnumSet.allOf(Styles.class);
        System.out.println(styleses);
        text.applyStyles(EnumSet.of(Styles.BOLD,Styles.ITALIC));
        text.applyStyles(EnumSet.of(Styles.STROKE_THROUGH));



        System.out.println();
    }
}
