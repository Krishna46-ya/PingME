export function SidePanel() {
    return (
        <div className="hidden lg:block relative w-full h-screen">
            <img className="absolute inset-0 h-full w-full object-cover" src={'/download.jpeg'}></img>
            <div className="flex items-center justify-center h-screen w-full font-mono text-white flex-col z-10 relative text-xl font-light text-center px-4">
                <div className="w-lg flex flex-col text-left tracking-tighter">
                    <div className="font-mono tracking-tighter text-5xl mb-10 mr-2">
                        PingMe
                    </div>
                    <div>
                        Stay connected, one ping at a time, anywhere in the world.
                    </div>
                </div>
            </div>
        </div>
    )
}