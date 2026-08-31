// Blocking = Node waits for the operation to finish before continuing.(Syncronous)
// Non-blocking = Node starts the operation and continues doing other work while it finishes in the background. (Asyncronous)
// non-block code go to thred and other execute parallel when thread work complte they send to event loop . event lopp check call stack have space to run program or not .

const fs = require("fs")

fs.readFileSync('./read.txt','utf-8')
console.log("Syncrounous");

fs.readFile('./text.txt','utf-8',(e,result)=>{
    console.log(result);
})
console.log("phele me chalunga readFile se because i am non blocking ");


 // give how many cpu thread i have
const os = require("os")
console.log(os.cpus().length); 