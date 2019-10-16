package server.effectivejava._37_using_EnumMap_prefer_ordial_index;

import java.util.*;
import java.util.stream.Stream;

import static java.util.stream.Collectors.groupingBy;
public class Plant {
    //javap -p 生成的字节码反编译文件
    enum LifeCycle {
        ANNUAL, PERENNIAL, BIENIAL,TRIENIAL
    }

    final String name;
    final LifeCycle lifeCycle;

    public Plant(String name, LifeCycle lifeCycle) {
        this.name = name;
        this.lifeCycle = lifeCycle;
    }

    @Override
    public String toString() {
        return name;
    }

    ////////
    public static void main(String[] args) {

        //values方法返回的是枚举数组如
        LifeCycle[] values = LifeCycle.values();
//        生成hashSet数组
        Set<Plant>[] plantsByLifeCycle = new HashSet[LifeCycle.values().length];
//        for (int i = 0; i < plantsByLifeCycle.length; i++) {
//            plantsByLifeCycle[i]=new HashSet<>();
//        }

        //生成花园，其中gargen数组中，包含一年生的2个（first与forth）
        Plant plant1, plant2, plant3, plant4,plant5,plant6;
        List<Plant> garden = new ArrayList<>();
        //

        Set set = new HashSet();
        set.add("12");
        set.add("12");
        set.add(14);
        plant1 = new Plant("first", LifeCycle.ANNUAL);//ordial=1
        plant6= new Plant("first", LifeCycle.ANNUAL);//ordial=1
        plant2 = new Plant("second", LifeCycle.BIENIAL);//ordial=2
        plant3 = new Plant("third", LifeCycle.PERENNIAL);//ordial=3
        plant4 = new Plant("first", LifeCycle.ANNUAL);//ordial=4
        plant5 = new Plant("fifth",LifeCycle.TRIENIAL);//
        garden.add(plant1);
        garden.add(plant6);
        garden.add(plant2);
        garden.add(plant3);
        garden.add(plant4);
        garden.add(plant5);

        for (int i = 0; i < plantsByLifeCycle.length; i++) {
            plantsByLifeCycle[i] = new HashSet<>();
        }

//        遍历已有的garden，添加到泛型数组中，但是这样做不好，容易出错
        for (Plant p : garden) {
            //这里的p.lifeCycle是生成花园的时候传入Plant中的,而ordial是生成序号的,这里可以用ordial代表索引
            plantsByLifeCycle[p.lifeCycle.ordinal()].add(p);
        }

        for (int i = 0; i < plantsByLifeCycle.length; i++) {
//            第二个输出的是hashset自带的toString方法，会遍历hashset中的元素的toString
//      todo       注意这里我们有责任使用正确的索引值，不正确的索引值会导致ArrayIndexOutOfBoundsExceptions,如这里输入7
//            todo  最好的方式是使用EnumMap
            System.out.println("%s :%s%n" + Plant.LifeCycle.values()[i] + plantsByLifeCycle[i]);
        }
//        List<>
//        for (Plant p : garden)


        //更好的方式是使用EnumMap来管理,其中key为生命周期，也就是多少年生的枚举类型
        Map<LifeCycle,Set<Plant>>  plantLifeCycleMap = new EnumMap<>(LifeCycle.class);//这里LifeCycle是类型令牌，可在运行时从令牌中恢复类型信息
        //根据所有的Key类型生成Map结构,其中值为HashSet
        for (LifeCycle lc : Plant.LifeCycle.values()){
            plantLifeCycleMap.put(lc, new HashSet<>());
        }

        //todo 遍历garden将gargen中的植物放入Map中
        for (Plant plant : garden){
            //根据lifeCycle找到在map中的对应的集合,并将元素添加到Set中
            plantLifeCycleMap.get(plant.lifeCycle).add(plant);
        }

        System.out.println("==============================================================");
        Set<Map.Entry<LifeCycle, Set<Plant>>> entries = plantLifeCycleMap.entrySet();
        Iterator<Map.Entry<LifeCycle, Set<Plant>>> iterator = entries.iterator();
        while (iterator.hasNext()){
            Map.Entry<LifeCycle, Set<Plant>> next = iterator.next();
            Set<Plant> value = next.getValue();
            System.out.println(value);
        }

//        使用流stream更加简化我们的代码
        Plant[] gardens = new Plant[]{
                new Plant("first", LifeCycle.ANNUAL),
                new Plant("second", LifeCycle.BIENIAL),
                new Plant("first", LifeCycle.TRIENIAL),
                new Plant("first",LifeCycle.ANNUAL),
                new Plant("first", LifeCycle.PERENNIAL)
        };
        //这里需要导入静态方法
        //Returns a sequential {@link Stream} with the specified array as its
        //       * source
        Stream<Plant> stream = Arrays.stream(gardens);
        //以lifeCycle分组，并返回
        Map<LifeCycle, List<Plant>> collect = stream.collect(groupingBy(p -> p.lifeCycle));
        System.out.println(collect);
    }


}
