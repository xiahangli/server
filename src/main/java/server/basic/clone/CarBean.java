package server.basic.clone;

import java.io.Serializable;

/**
 * Created by henry on 2018/3/12.
 */
public class CarBean  implements Serializable{

    private static final long serialVersionUID = -1192038120371928301L;

    private int speed;
    private String name;

    public CarBean(int speed, String name) {
        this.speed = speed;
        this.name = name;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CarBean{" +
                "speed=" + speed +
                ", name='" + name + '\'' +
                '}';
    }
}
