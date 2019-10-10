package server.effectivejava._22_use_interfaces_only_to_define_type;

/**
 * Created by Administrator on 2019/10/10.
 */
public class Test {
    /**
     * 错误使用
     */
//    interface PhysicalConstant{
//      static final double AVOGADROS_NUMBER = 6.022_140_857e23;
//      static final double BOLTZMANN_NUMBER = 1.380_648_52e-23;
//      static final double ELECTRON_MASS = 6.022_140_857e23;
//    }


    public static void main(String[] args) {
        double avogadrosNumber = PhysicalConstant.AVOGADROS_NUMBER;
        PhysicConstant avogadrosNumber1 = PhysicConstant.AVOGADROS_NUMBER;
        int ordinal = avogadrosNumber1.ordinal();//顺序
        PhysicConstant avogadros_number = PhysicConstant.valueOf("BOLTZMANN_NUMBER");
        double constant = avogadros_number.getConstant();
        System.out.println(ordinal);

    }
}

enum PhysicConstant{
    AVOGADROS_NUMBER(6.022_140_857e23),BOLTZMANN_NUMBER(1.380_648_52e-23),ELECTRON_MASS(6.022_140_857e23);
    private final double constant;

    PhysicConstant(double constant){
        this.constant = constant;
    }

    public double getConstant() {
        return constant;
    }
}

/**
 * 正确使用
 */
class PhysicalConstant{
    private PhysicalConstant(){}
    static final double AVOGADROS_NUMBER = 6.022_140_857e23;
    static final double BOLTZMANN_NUMBER = 1.380_648_52e-23;
    static final double ELECTRON_MASS = 6.022_140_857e23;
}
