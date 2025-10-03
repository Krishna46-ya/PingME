export const InputBox = ({ placeholder, title, type , onChange }: {
    placeholder: string,
    title: string,
    type? : string,
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <>
            <div>
                <div className="font-semibold pt-2 pb-2">{title}</div>
                <input placeholder={placeholder} onChange={onChange} type={ type || "text"} className="border p-2 w-full border-slate-300 rounded-md"></input>
            </div>
        </>
    )
}