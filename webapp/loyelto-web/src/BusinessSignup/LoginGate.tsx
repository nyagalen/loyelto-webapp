import { usePrivy, getAccessToken } from "@privy-io/react-auth";
import { useEffect, useState, ReactNode } from "react";
import { authService } from "../api";

/**
 * Props for the LoginGate component.
 */
interface LoginGateProps {
    /** Child components to render when authenticated. */
    children: ReactNode;
}

/**
 * Gate component that requires Privy authentication and backend handshake
 * before rendering children. Ensures the user exists in the backend DB.
 */
export default function LoginGate({ children }: LoginGateProps) {
    const { ready, authenticated, login } = usePrivy();
    const [handshakeDone, setHandshakeDone] = useState(false);

    useEffect(() => {
        if (ready && !authenticated) login();
    }, [ready, authenticated, login]);

    useEffect(() => {
        if (!authenticated) return;
        let cancelled = false;
        getAccessToken().then(token => {
            if (!token || cancelled) return;
            authService.handshake(token)
                .then(() => { if (!cancelled) setHandshakeDone(true); })
                .catch(err => console.error("Handshake failed:", err));
        });
        return () => { cancelled = true; };
    }, [authenticated]);

    if (!authenticated || !handshakeDone) return <div>Loading...</div>;
    return children;
}