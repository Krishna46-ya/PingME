import { useEffect, useRef, useState } from "react"

export function InfoBox({ convoId, name }: { convoId: string, name: string }) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function OutsideClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", OutsideClick)
        return () => document.removeEventListener("mousedown", OutsideClick)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button onClick={() => {
                setOpen((p) => !p)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:bg-slate-600 transition-colors duration-300 ease-in-out rounded-full active:bg-slate-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
            </button>
            {open && <div className="absolute top-10 divide-y text-lg font-semibold w-[300px] divide-slate-500 text-slate-800 bg-white border border-slate-500 rounded-lg right-1">
                <div className="p-2">Id:{" "}{convoId}</div>
                <div className="p-2 truncate">{name}</div>
            </div>}
        </div>
    )
}