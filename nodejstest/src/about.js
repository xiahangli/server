console.log("about");

var fn = () =>{ new Date().getFullYear() ;return 1}; // this指向obj对象
console.log(fn());
class Test {
    constructor(){
        const num = 1;
    }

    func1(num){
        this.num = num
    }
    func2 = (num) => {
        this.num = num
    }
}
// var t = new Test();
// t.func2(12);
// console.dir(t)

// class Bork {
//     //Property initializer syntax
//     instanceProperty = "bork";
//     boundFunction = () => {
//         return this.instanceProperty;
//     }
//
//     //Static class properties
//     static staticProperty = "babelIsCool";
//     static staticFunction = function() {
//         return Bork.staticProperty;
//     }
// }
