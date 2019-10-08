package server.dp.adapter;


/**
 * Created by henry on 2018/3/15.
 */
public class EmployeeCAdapterEmployeeA implements IEmployee {

    //这里用了组合的思想
   EmployeeC.CName cName;

   public EmployeeCAdapterEmployeeA(){
       cName = new EmployeeC().new CName();//内部类的构建方式
   }

    @Override
    public String getName() {
        return cName.getName();
    }

    @Override
    public void setName(String name) {
        cName.setName(name);
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
        return null;
    }

    @Override
    public void setAddress(String address) {

    }

    @Override
    public String getAge() {
        return null;
    }

    @Override
    public void setAge(String age) {

    }

    public static void main(String[] args) {
        IEmployee c = new EmployeeCAdapterEmployeeA();
        //TODO 一系列操作
        c.setName("CJB公司");
        String address = c.getName();
        System.out.println(address);

    }
}
