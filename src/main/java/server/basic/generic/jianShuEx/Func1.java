package server.basic.generic.jianShuEx;

/**
 * 尖括号括起来的T、R是参数类型列表
 * 我们定义一个Func1接口，用来将T类型转换成R类型然后返回
 * </>
 *
 * @param <T>
 * @param <R>
 */
interface Func1<T, R> {
    R call(T t);
}