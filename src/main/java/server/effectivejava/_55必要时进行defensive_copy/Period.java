package server.effectivejava._55必要时进行defensive_copy;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

/**
 * Created by Administrator on 2019/10/16.
 */
public final class Period {
    /**
     * 因为date是可变量，最直接的方式是使用Instant
     */
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {

        //todo 修改成defensive copy 注意这里不要用clone,
        // todo 因为入参的类型可能是子类话的，而这个子类是不受信任的,而且应该用在最开始的地方
//        this.start = new Date(start.getTime());
//        this.end = new Date(end.getTime());

        this.start = (Date) start.clone();
        this.end = (Date) end.clone();
        //比较的应该是defesive copy 而不是原始的
        if (this.start.compareTo(this.end) > 0) {
            //start-end>0
            throw new IllegalArgumentException("异常");
        }
//        this.start = start;
//        this.end = end;
    }

    public Date start() {
        return start;
    }

    public Date end() {
        return end;
    }


    public static void main(String[] args) throws ParseException, CloneNotSupportedException {
        Date start =  new Date();
        Date end =new Date();
        Period p = new Period(start,end);
        p.end().setYear(33);//改变了Date,

        //不可变的时间
        Instant instant =  Instant.ofEpochSecond(30000, 123);
        test();
//        Instant.atZone();
//        ZonedDateTime zonedDateTime = new ZonedDateTime();
    }

    public  static void test() throws ParseException, CloneNotSupportedException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Employee employee1 = new Employee();
        employee1.setEntryTime(sdf.parse("1990-1-1"));
        //如果Emplyee的clone是调用super.clone那么有CloneNotSupportedException异常
        Employee employee2 = (Employee) employee1.clone();

        Date date =  employee2.getEntryTime();

        date = sdf.parse("1990-1-2");
        employee2.setEntryTime(date);

        System.out.println(employee1.toString());
        System.out.println(employee2.toString());
    }
   static final class Employee{
        Date date;
        void  setEntryTime(Date d ){
            date = d;
        }
        Date getEntryTime(){return date;}

       /**
        *
        * @return
        * @throws CloneNotSupportedException
        */
        @Override
        protected final Object clone() throws CloneNotSupportedException {
            return super.clone();
        }
    }
}
