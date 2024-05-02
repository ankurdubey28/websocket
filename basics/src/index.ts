import express from 'express'
import {WebSocketServer,WebSocket} from "ws";

const app=express()
const server=app.listen(3000)

const wss=new WebSocketServer({server:server})

wss.on('connection',(ws)=>{
    ws.on('error',(e)=>{
        console.error(e.message)
    })
    ws.on('message',function (data,isBinary){
        wss.clients.forEach((client)=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary})
                // what is the difference between ws.send and client.send
            }
        })
    })
    ws.send('Hello world')
})