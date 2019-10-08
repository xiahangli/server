package server.basic.generic;

 interface Info <T> {
    // just return var:-)
    T info(T var);
}
public class BridgeMethodTest implements Info <Integer> {
    @Override
    public Integer info(Integer var) {
        return var;
    }
}