const webSocket = require('ws') // npm install ws

// socket.io 
let sockets = []
module.exports = (server) => {
    const wss = new webSocket.Server({ server })
    // const wss = new webSocket.Server({ port:3006 })
    // tab1 / tab2 
    wss.on('connection',(ws, req)=>{
        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws)
        console.log(req.connection.remoteAddress)

        // code : 연결이 종료되는 이유를 가르키는 숫자
        // 기본값은 1000
        ws.send('web7722님 환영합니다.')
        // reason : 왜종료되는지 사람이 읽을수 있도록 나타내는 문자열
        // UTF-8 포멧 123바이트를 넘을수없다.
        ws.on('close',()=>{
            console.log('고객이 도망쳤다!')
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })

            console.log(sockets.length)
        })

        ws.on("message", (response)=>{
            let obj = JSON.parse(response.toString('utf-8'))
            let {type,data} = obj

            switch(type){
                case 'send_meg':
                    sockets.forEach( v => {     
                        v.send(data)
                    })
                break;
            }

            
        })
    })

   
}

// event 내용 

// on 듣기 
// send 말하기 

