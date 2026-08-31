const http = require("http")
const fs = require("fs")

// create server ----------------------------------------------------------------------------------------------------
const myServer = http.createServer((request, response )=>{
    console.log(request.headers); // request header detail 

    const log = `Today date : ${Date.now()} : ${request.url}\n` // server restart by ct+c in terminal and refresh lochalhost:port
    fs.appendFile('log.txt',log,(e,data)=>{ // accept request in file
          // response.end("I Accept your request");
          switch(request.url){
            case '/home': response.end('Welcome to Home Page Jagjit')
            break;
            case '/about': response.end('Welcome to About Page Jagjit')
            break;
            case '/contact': response.end('Welcome to Contact Page Jagjit')
            break;
            default : response.end('Ooops page not found  !!!!');
          }
    })

    // response.end("I Accept your request")
});

myServer.listen(8000,()=>console.log('Server Listen and Start !!!')) // if i do any change so we need restart server



