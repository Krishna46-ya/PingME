export function Skeleton() {
    return (
        <div className="max-w-[1680px] mx-auto">
            <div className="flex h-screen bg-slate-50">
                <div className="sm:w-3/10 w-full ">
                    <div className="h-[60px] bg-slate-300 flex items-center px-4 border-b border-dashed border-slate-400">
                        <div className="h-11 w-11 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="ml-3 h-6 w-36 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />   
                </div>

                <div className="w-7/10 hidden sm:block border-l border-dashed border-slate-400">
                    <div className="h-screen w-full bg-[#fafafa] relative text-gray-950">
                        <div
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px),
                  repeating-linear-gradient(-45deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 20px)
                `,
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Chat() {
    return (
        <>
            <div className="flex items-center p-3 px-4">
                <div className="size-11 min-w-11 bg-gray-400 mr-2 rounded-full animate-pulse">

                </div>
                <div className="min-w-full">
                    <div className="h-[14px] w-1/2 bg-gray-400 mb-1 rounded-full animate-pulse"></div>
                    <div className="h-[12px] w-2/3 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            </div>

        </>
    )
}