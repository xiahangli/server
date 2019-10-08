package server.basic.generic;

import java.util.Date;

/**
 * 装饰器用来满足各种可能的组合，直接实例化子类会导致产生过多的类
 * <p/>
 * <p/>
 * 装饰器使用分层对象来动态透明的向单个对象添加责任，
 * <p/>
 * 装饰器指定包装在最初的对象周围的所有对象都具有相同的基本接口
 *
 *
 * 某些事物是可以装饰的，可通过讲其他类包装在这个可装饰对象的四周，来将功能分层，这使得对装饰器的使用是透明的-----无论对象是否被装饰，你都拥有一个可以向对象发送的公共消息集
 * 装饰类可以添加新的方法，但是下面测试类体现了它的局限性（包装器只能作用于最后一层）
 */

class Basic{
    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}

/**
 * 装饰器模式
 */
class Decorator extends Basic{
   protected Basic basic;
    public Decorator(Basic basic){
        this.basic = basic;
    }

    public void set(String val){
        basic.setValue(val);
    }

    public void get(){
        basic.getValue();
    }
}

/**
 * 时间戳装饰器
 */
class TimeStamped extends Decorator{
private final long timeStamp;
    public TimeStamped(Basic basic) {
        super(basic);
        //添加装饰,即时间
        timeStamp  = new Date().getTime();
    }

    public long getTimeStamp(){
        return timeStamp;
    }
}

/**
 * 串行序列装饰器
 */
class SerialNumbered extends Decorator{
private static long counter = 1;
    private final long serialNumber = counter++;
    public SerialNumbered(Basic basic) {
        super(basic);
    }

    public long getSerialNumber() {
        return serialNumber;
    }
}

/**
 * 测试类
 */
public class Decoration {
    public static void main(String[] args) {
        //
        TimeStamped t = new TimeStamped(new Basic());
        //serialNumberd继承了decorator,而decorator继承了basic
        //******注意不能通过t2.getSerialNumber，因为包装器器的最后一层才是实际的类型，他只能工作与装饰的一层（最后一层）
        //而混型方法显然更自然
        TimeStamped t2 = new TimeStamped(new SerialNumbered(new Basic()));
        long timeStamp = t2.getTimeStamp();
        //同理SerialNumbered 也无法拿到TimeStaped装饰器的方法
        SerialNumbered serialNumbered = new SerialNumbered(new TimeStamped(new Basic()));
        serialNumbered.getSerialNumber();
    }
}
