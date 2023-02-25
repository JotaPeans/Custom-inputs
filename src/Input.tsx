import React, { useState, useRef } from "react";

interface IInput {
    label: string,
    refInput: React.RefObject<HTMLInputElement>,
}

const Input = ({ label, refInput }: IInput) => {
    const ref = useRef<HTMLInputElement>(null);
    const [labelState, setlabelState] = useState(false)

    function handleFocus() {
        ref.current?.value 
        setlabelState(true);
    }

    function handleBlur() {
        !ref.current?.value ? setlabelState(false) : setlabelState(true);
    }

    function handleChange() {
        if(refInput.current && ref.current) {
            refInput.current.value = ref.current.value
        }
    }

    return (
        <div className="flex flex-col justify-center relative">
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl`} htmlFor={label}>{label}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className=" h-12 bg-slate-900/40 rounded-xl px-4 text-xl" id={label} type="text" />
        </div>
    );
}
 
export default Input;