import { createContext, useContext, useRef, useCallback, ReactNode, RefObject } from 'react';

/**
 * Context value for scroll functionality.
 */
interface ScrollContextValue {
    /** Ref to attach to the waitlist section element. */
    waitlistRef: RefObject<HTMLDivElement | null>;
    /** Function to smoothly scroll to the waitlist section. */
    scrollToWaitlist: () => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

/**
 * Props for the ScrollProvider component.
 */
interface ScrollProviderProps {
    /** Child components that can access scroll functionality. */
    children: ReactNode;
}

/**
 * Provider component that enables scroll-to-section functionality.
 * Wrap this around components that need to scroll to the waitlist.
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
    const waitlistRef = useRef<HTMLDivElement | null>(null);

    const scrollToWaitlist = useCallback(() => {
        waitlistRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <ScrollContext.Provider value={{ waitlistRef, scrollToWaitlist }}>
            {children}
        </ScrollContext.Provider>
    );
}

/**
 * Hook to access scroll functionality.
 * Must be used within a ScrollProvider.
 * @returns Object containing waitlistRef and scrollToWaitlist function.
 * @throws Error if used outside of ScrollProvider.
 */
export function useScroll(): ScrollContextValue {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScroll must be used within a ScrollProvider');
    }
    return context;
}
