package server.basic.clz;

interface Customer {
    String purchase();
}

class VIP implements Customer {
    @Override
    public String purchase() {
        return "VIP First !";
    }
}

class NOT_VIP implements Customer {
    @Override
    public String purchase() {
        return "VIP First !";
    }
}

abstract class MerchantOther<T extends Customer> {
    public double actionPrice(double price, T customer) {
        return price * 0.08;
    }
}

class VIPOnlyMerchant extends MerchantOther<VIP> {
    @Override
    public double actionPrice(double price, VIP customer) {
        return price * 0.07;
    }
}

public class MethodFind {
    public static void main(String[] args) {
        MerchantOther merchantOther = new VIPOnlyMerchant();
        // 调用实际的方法
        merchantOther.actionPrice(80, new VIP());
        // 调用的是桥接方法，出现 java.lang.ClassCastException 的异常
        merchantOther.actionPrice(90, new NOT_VIP());
    }
}