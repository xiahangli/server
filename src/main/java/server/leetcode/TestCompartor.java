package server.leetcode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class TestCompartor {
    public static void main(String[] args) {
        ArrayList<Coupon> persons = new ArrayList<Coupon>();
        persons.add(new Coupon(13, 0, new BigDecimal(40),0));
        persons.add(new Coupon(13, 0, new BigDecimal(50),0));
        persons.add(new Coupon(13, 0, new BigDecimal(50),1));
        persons.add(new Coupon(13, 0, new BigDecimal(50),1));
        persons.add(new Coupon(13, 0, new BigDecimal(50),0));
        persons.add(new Coupon(13, 0, new BigDecimal(45),1));
        persons.add(new Coupon(1, 0, new BigDecimal(20),0));
        persons.add(new Coupon(13, 1, new BigDecimal(30),0));
        persons.add(new Coupon(1, 0, new BigDecimal(25),1));
        persons.add(new Coupon(11, 0, new BigDecimal(50),1));
        persons.add(new Coupon(11, 1, new BigDecimal(40),0));
        System.out.println("排序之前：");
        for (int i = 0; i < persons.size(); i++) {
            System.out.println(persons.get(i));
        }
        System.out.println();
        Collections.sort(persons, new Comparator<Coupon>() {
            public int compare(Coupon o1, Coupon o2) {
                if (o1.valueAble.compareTo(o2.valueAble) == 0) {
                    if (o2.themeType.compareTo(o1.themeType) == 0) {
                        if (o2.amount.compareTo(o1.amount) == 0){
                            return o2.favorite-o1.favorite;
                        }else{

                        return o2.amount.compareTo(o1.amount) > 0 ? 1 : -1;
                        }
                    } else {
                        return o2.themeType - o1.themeType;
                    }
                } else {
                    return o1.valueAble - o2.valueAble;
                }
            }
        });
        System.out.println("排序后结果：");
        for (int i = 0; i < persons.size(); i++) {
            System.out.println(persons.get(i));
        }
    }

    /**
     *
     */
    static class Coupon {
        public Integer themeType; //优惠券类型
        public Integer valueAble; //可用 ，0 可用，1不可用
        public BigDecimal amount; //面额
        public Integer favorite;

        @Override
        public String toString() {
            return "Person{" +
                    "themeType=" + themeType +
                    ", valueAble=" + valueAble +
                    ", amount=" + amount +
                    ", favorite="+favorite+
                    '}';
        }

        public Coupon(Integer themeType, Integer valueAble, BigDecimal amount, Integer b) {
            super();
            this.favorite = b;
            this.themeType = themeType;
            this.valueAble = valueAble;
            this.amount = amount;
        }
    }
}