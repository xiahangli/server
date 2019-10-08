package server.basic.generic;

/**
 * 泛型擦除带来的代价，无法知道类类型
 * 无法强制使用（为了迁移性）
 * 泛型类
 * @param <T>
 */
//返回一个类型，可通过泛型类在类层级实现泛型
class GenericBase<T> {
  private T element;
  public void set(T arg) { arg = element; }
  public T get() { return element; }
}

class Derived1<T> extends GenericBase<T> {}

class Derived2 extends GenericBase {} // No warning

// class Derived3 extends GenericBase<?> {}
// Strange error:
//   unexpected type found : ?
//   required: class or interface without bounds	

public class ErasureAndInheritance {
  @SuppressWarnings("unchecked")
  public static void main(String[] args) {
    Derived2 d2 = new Derived2();
    Object obj = d2.get();
      //产生一个警告，说是unchecked call to set(T )方法，没有类型检查，可以通过@SuppressWarnings抑制警告
    d2.set(obj); // Warning here!
  }
}
