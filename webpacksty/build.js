const babel1 = require('@babel/core');

const code = `
    const sayHi = ()=>{
  console.log("hello babel")
}
sayHi()
`;
const optionsObjects={}
const result = babel1.transform(code,optionsObjects);
console.log(result)