function f(str) {
  return str.trim().split(/\s+/).reverse().join(' ');
}
var Firststr = "хвилищевский ужгород чечевица";
const Revercestr = f(Firststr);
console.log(`При строке ${Firststr} её перевёрнутая версия ${Revercestr}`)