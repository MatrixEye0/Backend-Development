const { log } = require("console");
const fs = require("fs") // file function 

// file creation syncrronus  ('file name', file data ) overwight content solve by append method.
fs.writeFileSync('./text.txt', "File created")

// file creation async.  it has one more option for error handaling
fs.writeFile('.async.txt','Asyncronous file',(err)=>{})

// read data syncronous  utf-8 tell encoding way of file 
const result = fs.readFileSync('./read.txt',"utf-8")
console.log(result);

// read async way they not return result they take callback 
fs.readFile('./read.txt',"utf-8",(err,result)=>{
    if(err) {
        console.log('Error') 
    } else{
        console.log(result);
        
    }
});

// apend not overwright data add new data
fs.appendFileSync('./text.txt',new Date().getDate().toLocaleString());

// apend not overwright data add new data
fs.appendFileSync('./text.txt',`${Date.now()}\n`);

fs.cpSync("./text.txt","./copy.txt") // create copy of text file in copy file name 

// deleat file 
fs.unlinkSync("./copy.txt")

console.log(fs.statSync('./text.txt'));  // give file detail like size etc & .isFile say this file or not use like this fs.statSync('./text.txt').isFile 

// folder create by fs.mkdirSync("foldername/folder inside folder/other folder inside nested folder")
fs.mkdirSync("folder1/a/b")