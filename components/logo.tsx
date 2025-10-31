export function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-start font-bold text-xl ${className}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-primary">
                <path d="M12 2.5L2.5 8V16L12 21.5L21.5 16V8L12 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 8L12 13.5L21.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21.5V13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-headline">AptitudeAI</span>
        </div>
    );
}
