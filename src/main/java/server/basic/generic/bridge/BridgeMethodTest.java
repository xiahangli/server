package server.basic.generic.bridge;

 interface Info <T> {
    // just return var:-)
    T info(T var);
}


public class BridgeMethodTest implements Info <Number> {
    @Override
    public Number info(Number var) {
        return var;
    }
}