package server.basic.clone;

import java.io.Serializable;

/**
 * Created by henry on 2018/3/12.
 */
public class PersonBean implements Serializable {

    private static final long serialVersionUID = -1231239128309127397L;

    private String name;
    private int age;
    private CarBean carBean;

    public CarBean getCarBean() {
        return carBean;
    }

    public void setCarBean(CarBean carBean) {
        this.carBean = carBean;
    }

    public PersonBean(String name, int age, CarBean carBean) {
        this.name = name;
        this.age = age;
        this.carBean = carBean;
    }

    public PersonBean(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "PersonBean{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", carBean=" + carBean +
                '}';
    }
}
