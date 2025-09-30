import { useEffect, useRef, useState } from "react";

export function useWebSocket(url) {
    const [ready, setReady] = useState(false);
    const wsRef = useRef(null);
    const queueRef = useRef([]);
    const retryRef = useRef(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let alive = true;

        const connect = () => {
            const ws = new WebSocket(url);
            wsRef.current = ws;

          
            


            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data.type === "init_messages"){
                    setMessages(data.messages)
                }else if(data.type==="new_message"){

                    setMessages((prev)=>{
                        return [...prev, {user:'', content:data.content}]
                    })
                }
                
            }

            ws.onopen = () => {
                retryRef.current = 0;
                setReady(true);
                // خالی کردن صف
                queueRef.current.forEach(msg => ws.send(msg));
                queueRef.current = [];
            };

            ws.onclose = (e) => {
                setReady(false);
                if (!alive) return;
                // اگر auth error بود (مثلاً 4401)، دیگر تلاش نکن
                const code = e.code;
                if (code === 4401) return;

                const timeout = Math.min(1000 * 2 ** retryRef.current, 15000);
                retryRef.current += 1;
                setTimeout(connect, timeout);
            };
        };

        connect();
        return () => { alive = false; wsRef.current?.close(); };
    }, [url]);

    const send = (obj) => {
        const str = JSON.stringify(obj);
        if (ready && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(str);
        } else {
            queueRef.current.push(str);
        }
    };

    return { ready, send, messages, socket: wsRef.current };
}
