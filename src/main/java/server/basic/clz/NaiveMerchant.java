package server.basic.clz;

class Merchant {
    public Number actionPrice(double price) {
        return price * 0.8;
    }
}

public class NaiveMerchant extends Merchant {

    @Override
    public Double actionPrice(double price) {
        return 0.9 * price;
    }

    public static void main(String[] args) {
        Merchant merchant = new NaiveMerchant();
        Number price = merchant.actionPrice(40);
        System.out.println(price);
    }
}