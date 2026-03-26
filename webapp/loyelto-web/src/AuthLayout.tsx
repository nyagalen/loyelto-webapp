import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

/**
 * AuthLayout handles authentication flow and protected routes.
 *
 * Triggers Privy login if user is not authenticated and renders
 * child routes once authentication is complete.
 */
export default function AuthLayout() {
    const { ready, authenticated, login } = usePrivy();
    const hasLoginBeenCalled = useRef(false);

    // This useEffect will safely trigger the login flow once
    useEffect(() => {
        if (ready && !authenticated && !hasLoginBeenCalled.current) {
            login();
            hasLoginBeenCalled.current = true;
        }
    }, [ready, authenticated, login]);

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        // We're in the middle of the login flow, so we don't render anything else
        return null;
    }

    // Once authenticated, render the child route (MainLayout)
    return <Outlet />;
}