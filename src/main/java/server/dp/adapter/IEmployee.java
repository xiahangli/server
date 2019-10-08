package server.dp.adapter;

/**
 * 这个是统一的标准了
 */
interface IEmployee {
    public String getName();
    public void setName(String name);
    public String getPosition();
    public void setPosition(String position);
    public String getAddress();
    public void setAddress(String address);
    public String getAge();
    public void setAge(String age);
}