package server.effectivejava._34_enum_prefer_constant;

/**
 * Created by Administrator on 2019/10/8.
 */
enum Planet {
    /**
     * 具体的枚举实例，必须放在开头
     */
    MERCURY(3.302e+23, 2.439e6),
    VENUS(4.302E+23, 2.439E6),
    EARTH(5.302E+23, 2.439E6),
    MARS(6.302E+23, 2.439E6),
    JUPITER(7.302E+23, 2.439E6),
    SATURN(8.302E+23, 2.439E6),
    URANUS(9.302E+23, 2.439E6),
    NEPTUNE(10.302E+23, 2.439E6);
    private final double mass;
    private final double radius;
    /**
     * 6.67*10^-11
     */
    private static final double G = 6.67e-11;
    private final double surfaceGravity;

    /**
     * 3.302*10^23
     */
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
        surfaceGravity = G * mass / (radius * radius);
    }

    public double getSurfaceGravity() {
        return surfaceGravity;
    }

    public double surfaceWeight(double mass) {
        return mass * surfaceGravity;
    }
}

enum BadOperation {
    PLUS, MINUS, DIVIDE, TIMES;

    public double apply(int x, int y) {
        switch (this) {
            case PLUS:
                return x + y;
            case MINUS:
                return x - y;
            case DIVIDE:
                return x / y;
            case TIMES:
                return x * y;
        }//断言出错,必须加入这个代码
        throw new AssertionError("not support operation!");
    }
    }

enum OptOperation{
    PLUS{
        @Override
        double apply(int x, int y) {
            return x+y;
        }
    },
    MINUS {
        @Override
        double apply(int x, int y) {
            return x-y;
        }
    },
    DIVIDE {
        @Override
        double apply(int x, int y) {
            return x/y;
        }
    },
    TIMES {
        @Override
        double apply(int x, int y) {
            return x*y;
        }
    };

    /**
     * 添加特定于常量的方法
     * @param x
     * @param y
     * @return
     */
    abstract double apply(int x,int y);
}


public class Test {
    public static void main(String[] args) {
        //枚举所有的星星,医用Planet.values方法
        for (Planet p : Planet.values()) {
            System.out.println(p.surfaceWeight(4));
        }
    }
}