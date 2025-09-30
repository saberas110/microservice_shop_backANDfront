import {Button} from "../../component/button/Button.tsx";
import {Container} from "../../component/container/Container.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


export default function Pay() {
    const location = useLocation()
    const navigate = useNavigate();
    const [message, setMessage] = useState(location.state?.message || null)

    useEffect(() => {
        if (message) {
            // پاک کردن state بعد از اولین بار نمایش
            navigate(location.pathname, { replace: true, state: {} });

            const timer = setTimeout(() => setMessage(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate, location.pathname]);


    return (
        <Container>
            {message && (
                <div className="border relative">
                    <h2 className="absolute right-0 border border-gray-400 rounded font-bold mt-3 text-right shadow-2xl
                        w-150 py-2 pr-3 bg-cyan-100 text-green-950">
                        {message}
                    </h2>
                </div>
            )}

                <Button variant='success'>پرداخت</Button>

        </Container>
    )
}