package server.dp.adapter;


import java.util.HashMap;
import java.util.Map;

/**
 * Created by henry on 2018/3/15.
 * 这个类将EmployeeB的方法改写成EmployeeA的方法
 * 继承源，且实现接口
 */
public class EmployeeBAdapterAEmployeeA extends EmployeeB implements IEmployee {


    @Override
    public Map<String, String> getInfo() {
        return super.getInfo();
    }

    @Override
    public void setInfo(Map<String, String> info) {
        super.setInfo(info);
    }

    @Override
    public String getName() {
        return getInfo().get("name");
    }

    @Override
    public void setName(String name) {

        Map<String, String> info = getInfo();
        info.remove("name");//hashmap是
        info.put("name", name);
        setInfo(info);
    }

    @Override
    public String getPosition() {
        return null;
    }

    @Override
    public void setPosition(String position) {

    }

    @Override
    public String getAddress() {
        return getInfo().get("address");
    }

    @Override
    public void setAddress(String address) {
        Map<String, String> hm = new HashMap<>();
        hm.remove("address");
        hm.put("address", address);
        setInfo(hm);
    }

    @Override
    public String getAge() {
        return null;
    }

    @Override
    public void setAge(String age) {

    }

    public static void main(String[] args) {
        IEmployee b = new EmployeeBAdapterAEmployeeA();
        IEmployee a = new EmployeeA();
        //TODO 一系列操作
        b.setAddress("什么傻逼地址");
        String address = b.getAddress();
        System.out.println(address);

    }
}
