package server.basic.clz;

public class Toy {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static int getPrice() {
        return price;
    }

    public static final int price = 10;

    static {
        System.out.println("Initializing");
    }

    Toy() {
        System.out.println("Building");
    }

    Toy(String name) {
        this.setName(name);
    }

    public String playToy(String player) {
        String msg = buildMsg(player);
        System.out.println(msg);
        return msg;
    }

    private String buildMsg(String player) {
        String msg = player + " plays " + name;
        return msg;
    }
}