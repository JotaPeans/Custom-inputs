import Input from "./Input";
import bg from "./bg.jpg";
import { useRef } from "react";

function App() {
    const mailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(mailRef.current?.value);
        console.log(passRef.current?.value);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-slate-200 font-semibold">
            <div className="absolute z-0 w-screen h-screen top-0 left-0 flex justify-center items-center opacity-50">
                <img src={bg} className="h-full" />
            </div>
            <div className="w-96 h-96 flex justify-center items-center bg-white/10 border border-slate-900/40 backdrop-blur-sm rounded-2xl p-4 py-10">

                <form className="flex flex-col gap-10 w-full" onSubmit={e => handleSubmit(e)}>
                    <Input inputType="cpf" refInput={mailRef} />
                    <Input inputType="password" refInput={passRef} />
                    <Input inputType="submit"/>
                    <input className="p-3 text-xl capitalize bg-slate-900/40 hover:bg-slate-900/60 transition-all rounded-xl cursor-pointer" type="submit" value="submit" />
                </form>

            </div>
        </div>
    )
}

export default App;
