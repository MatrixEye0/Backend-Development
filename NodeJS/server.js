const http = require("http")
const fs = require("fs")
const url = require("url")

// create server ----------------------------------------------------------------------------------------------------
const myServer = http.createServer((request, response )=>{
    // console.log(request.headers); // request header detail 

    const log = `Today date : ${Date.now()} : ${request.url}\n` // server restart by ct+c in terminal and refresh lochalhost:port
    const myurl =url.parse(request.url,true) // parse url and query string
    console.log(myurl)

    fs.appendFile('log.txt',log,(error,data)=>{ // accept request in file
          // response.end("I Accept your request");

          // switch(request.url)
          switch(myurl.pathname)
          {
            case '/home': response.end('Welcome to Home Page Jagjit')
            break;
            case '/about': 
            const user = myurl.query.myname; // query string
            response.end(`${user} Welcome to About Page Jagjit`) // http://localhost:8000/about?myname=Jagjit give query string in url

            break;
            case '/contact': response.end('Welcome to Contact Page Jagjit')
            break;
            default : response.end('Ooops page not found  !!!!');
          }
    })
    // response.end("I Accept your request")
});

myServer.listen(8000,()=>console.log('Server Listen and Start !!!')) // if i do any change so we need restart server



