import React, { useState, useRef } from "react";

interface IInput {
    inputType: "email" | "password" | "cpf" | "text" | "submit",
    refInput?: React.RefObject<HTMLInputElement>,
}

const Input = ({inputType = "text", refInput }: IInput) => {
    const ref = useRef<HTMLInputElement>(null);
    const [labelState, setlabelState] = useState(false);
    const [key, setKey] = useState("");

    function handleFocus() {
        if(inputType !== "submit") {
            ref.current?.value;
            setlabelState(true);
        }
    }

    function handleBlur() {
        !ref.current?.value ? setlabelState(false) : setlabelState(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(inputType === "cpf") {
            maskCpf(key);

            if(refInput?.current && ref.current) {
                refInput.current.value = ref.current.value.replace(/\D/g, "");
            }
            return
        }

        if(refInput?.current && ref.current) {
            refInput.current.value = ref.current.value;
        }
    }

    return (
        <div className="flex flex-col justify-center relative">
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl ${inputType === "submit" ? "hidden" : null} ${inputType === "cpf" ? "uppercase" : "capitalize"}`} htmlFor={inputType}>{inputType}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input maxLength={inputType === "cpf" ? 14 : undefined} type={inputType} value={inputType === "submit" ? inputType : undefined} onChange={e => handleChange(e)} onKeyDown={e => setKey(e.key)} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className={` h-12 bg-slate-900/40 rounded-xl px-4 text-xl ${inputType === "submit" ? "cursor-pointer hover:bg-slate-900/60 transition-all" : null}`} id={inputType} />
        </div>
    );
}
 
export default Input;