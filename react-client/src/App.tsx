import {useEffect, useState} from 'react'

import './App.css'

function App(){
const [Socket,setSocket]=useState<WebSocket|null>(null)
const[message,setMessage]=useState<string>("")

    useEffect(()=>{
        const socket=new WebSocket('ws://localhost:3000')
        socket.onopen=()=>{
            console.log("Connection Established");
            socket.send('Hello server')
            setSocket(socket);
        }
        socket.onmessage=(message):void=>{
            console.log(message.data)
            setMessage(message.data)
        }

        return ()=>{socket.close()}
    },[])

    if(!Socket){
        return <>loading..</>
    }

    return (
        <>
            {message}
        </>
    )
}

export default App
