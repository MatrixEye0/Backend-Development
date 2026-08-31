function square(a,b,c){
    return a**b**c;
}
function Add(a,b,c){
    return a+b+c;
}
// module.exports= square; // way to export
// export multi function avoid overwriting of variable
module.exports={
  square, Add
}
// other to export anonymus function
// exports.sub=(a,b)=>a-b;