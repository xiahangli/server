package server.basic.generic;

/**
 * 演示
 */

interface Payable<T>{}

/**
 * 雇员
 */
class Employee implements Payable<Employee>{}

/**
 * 钟点工
 */
//class Hourly extends Employee implements Payable<Hourly> {
//
//}

public class MultipleInterfaceVariants {
}
