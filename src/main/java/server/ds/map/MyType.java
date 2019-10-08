package server.ds.map;

class MyType {

    private String arga;

    private String argb;


    public MyType(String arga, String argb) {

        this.arga = arga;

        this.argb = argb;

    }

    @Override
    public int hashCode() {
        return arga.hashCode() + argb.hashCode();
    }


    /**
     * 你TM再运行下MapTest就知道同样的Key值不会重复存储了，这里MyType就是Key
     * @param obj
     * @return
     */
    @Override
    public boolean equals(Object obj) {


        if (this == obj) {//如果待比较的对象和本对象的引用地址相等，那么肯定是同一个对象了
            return true;
        }
        if (!(obj instanceof MyType)) {//如果待比较对象甚至都不是MyType类型的实例，那说个毛啊
            return false;
        }

        MyType p = (MyType) obj;//是的话先转换成MyType实例，

        if (this.arga.equals(p.arga) && this.argb.equals(p.argb)) {//细细比较内部元素是否相同，相同则认为是同一个对象，这个由业务决定
            return true;
        } else {
            return false;
        }
    }
}