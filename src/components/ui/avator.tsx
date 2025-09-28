import { ID, useChatStore } from "@/store/useChatStore";
import Image from "next/image";

export function Avator({ id }: { id: ID }) {

    const user = useChatStore(s => s.users.find(u => u.id === id))

    return (
        <div className="aspect-square size-11 relative rounded-full overflow-hidden ">
            {user?.image && <Image src={user.image} alt="avator" fill className="object-cover"></Image>}
            {!user?.image && user?.name && <div className="bg-orange-400 text-xl text-white font-semibold inset-0 flex justify-center items-center h-full">{user.name[0].toUpperCase()}</div>}
        </div>
    )
}