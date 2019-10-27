package server.basic.innerclz;

import server.basic.array.Array;

import java.util.Arrays;
import java.util.Random;

class A {
    public int i = 0;
    public B b = new B() {
        @Override
        public void run() {
            i = 11;
        }
    };

    /**
     * [4,3,5,2,8]
     *
     * @param arr
     * @param low  最低索引 0
     * @param high 最高索引 length-1
     */
    private static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;//等于即可退出递归
        int pivot = arr[low];
        int i = low, j = high;
        while (i < j) {
            while (i < j && arr[j] >= pivot) j--;
            arr[i] = arr[j];
            while (i < j && arr[i] <= pivot) i++;
            arr[j] = arr[i];
        }
        arr[i] = pivot;
        quickSort(arr, low, i - 1);
        quickSort(arr, i + 1, high);
    }

    private static void mergeSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int mid = (low + high) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        int temp[] = new int[high - low + 1];
        int i = low, j = mid + 1, p = 0;
        while (i <= mid && j <= high) temp[p++] = arr[i] < arr[j] ? arr[i++] : arr[j++];
        while (i <= mid) temp[p++] = arr[i++];
        while (j <= high) temp[p++] = arr[j++];
        for (int k = 0; k < high - low + 1; k++) arr[k + low] = temp[k];
    }

    private static void insertSort(int[] arr, int low, int high) {
        for (int i = low + 1; i <= high; i++) {
            int temp = arr[i];//arr[i]为
            int j = i - 1;
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[low + j + 1] = temp;
        }
    }

    /**
     * 堆排序
     *
     * @param arr
     * @param low
     * @param high
     */
    private static void heapSort(int arr[], int low, int high) {
        int N = arr.length - 1;
        for (int k = N / 2; k >= 0; k--) {
            while (2 * k + 1 <= N) { //下沉
                int j = 2 * k + 1;
                //j+1不需要等于arr.length,这里原始数据要-1，
                // 因为我们的j是从1开始计的
                if (j + 1 <= N && arr[j] < arr[j + 1]) j++;//选择大的下标
                //等于也不用下沉
                if (arr[k] >= arr[j]) break;
                //当测试节点比左右子节点的大值大，交换测试的数与左右孩子的大值
                int temp = arr[j];
                arr[j] = arr[k];
                arr[k] = temp;
                k = j;//更新k值
            }
        }

        //每次移除最大值到堆的末尾实现排序
        //[0...N-1,N]共N+1个元素，a[N]为第N+1个元素
//        int N = arr.length;//第length+1
        N = arr.length - 1;
        while (N > 0) {
            //交换第一个元素与每次已排序列的最后一个元素最后一个元素
            int temp = arr[0];
            arr[0] = arr[N];
            arr[N] = temp;
            N--;
            //再次max-heapipy维持堆有序,使用sink的方式,将第一个元素sink到合适的位置
            //k代表循环测试的节点下标
            int k = 0;
            while (2 * k + 1 <= N) {
                int j = 2 * k + 1;
                if (j + 1 <= N && arr[j] < arr[j + 1]) j++;
                    if (arr[k] >= arr[j]) break;
                    int tmp = arr[k];
                    arr[k] = arr[j];
                    arr[j] = tmp;
                    k = j;
            }
        }
    }

    private static void bubble(int[] arr, int low, int high) {
        //摄第一个元素已拍好
//        for (int i = low+1; i <=high; i++) {
//            int temp = arr[i];
//            int j=i-1;
//            while(j>=0&&arr[j]>temp){arr[j+1]=arr[j];j--;}
//            arr[low+j+1]=temp;
//        }
        for (int i = low; i < high; i++) {
            for (int j = low; j < high - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    private static void selectionSort(int arr[], int low, int high) {
        for (int i = low; i < high - low; i++) {
            for (int j = low; j < high - low; j++) {
                int minIndex = j;
                int min = arr[minIndex];
//                if(arr[minIndex] == j)
            }
        }
    }


    public static void main(String[] args) {
        int[] a = new int[1000];
        for (int i = 0; i <a.length; i++) {
            if (i%2==0)
                a[i] = (int) - (Math.random()*20);
            else
                a[i] = (int) (Math.random()*20);
        }
//        quickSort(a, 0, a.length - 1);
//        mergeSort(a, 0, a.length-1);
//        insertSort(a, 0, a.length - 1);
        heapSort(a, 0, a.length);
//        mergeSort(a, 0, 4);
//        bubble(a, 0, a.length-1);

        System.out.println();

//        A a = new A();
//        System.out.println(a.i);
//        a.b.run(); // 调用闭包方法，匿名内部类内部会生成一个$A的final变量，并将this指        指向这个$A
//        System.out.println(a.i);
//        a = null;
    }

    static class B {
        public void run() {
        }
    }
}
