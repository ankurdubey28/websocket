"use client"

import {useEffect, useState} from "react";


export default function Home() {
  const[Socket,setSocket]=useState<WebSocket|null>(null)
  const[message,setMessage]=useState("")
  useEffect(()=>{
    const socket=new WebSocket('ws://localhost:3000')

    socket.onopen=()=> {
      console.log("connection Established")
      socket.send("hello server")
      setSocket(socket)
    }

    socket.onmessage=(msg)=>{
      setMessage(msg.data)
    }
    return ()=>{
      socket.close()
    }

  },[])

  if(!Socket){
    return <>loading</>
  }
  return (
      <>{message}</>
  );
}
