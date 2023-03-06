import Input from "./Input";
import bg from "./bg.jpg";
import { useRef } from "react";

function App() {
    const cpfRef = useRef<HTMLInputElement>(null);
    const telRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(cpfRef.current?.value);
        console.log(telRef.current?.value);
        console.log(passRef.current?.value);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-slate-200 font-semibold">
            <div className="absolute z-0 w-screen h-screen top-0 left-0 flex justify-center items-center opacity-50">
                <img src={bg} className="h-full" />
            </div>
            <div className="w-96 h-96 flex justify-center items-center bg-white/10 border border-slate-900/40 backdrop-blur-sm rounded-2xl p-4 py-10">

                <form className="flex flex-col gap-10 w-full" onSubmit={e => handleSubmit(e)}>
                    <Input inputType="cpf" refInput={cpfRef} />
                    <Input inputType="tel" refInput={telRef} />
                    <Input inputType="password" refInput={passRef} />
                    <Input inputType="submit"/>
                </form>

            </div>
        </div>
    )
}

export default App;
