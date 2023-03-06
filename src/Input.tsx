import React, { useState, useRef } from "react";

interface IInput {
    baseColor?: string,
    inputType: "email" | "password" | "cpf" | "text" | "submit" | "tel",
    label?: string,
    onChange?: React.Dispatch<React.SetStateAction<string>>
    refInput?: React.RefObject<HTMLInputElement>,
}

const Input = ({inputType = "text", refInput, label, onChange, baseColor = "bg-slate-900/40" }: IInput) => {
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
        if(inputType !== "submit") {
            !ref.current?.value ? setlabelState(false) : setlabelState(true);
        }
    }

    function maskCpf(key: string) {
        
        const input = ref.current;

        const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        if(key in numberKeys) {
            if(input?.value.length === 3 || input?.value.length === 7) {
                input.value = input.value + ".";
            }
            else if(input?.value.length === 11) {
                input.value = input.value + "-";
            }
            else if (input?.value.length === 4) {
                let array = input.value.split("");
                array[3] = ".";
                let string = array.join("");
                input.value = string + key;
            }
            else if (input?.value.length === 8) {
                let array = input.value.split("");
                array[7] = ".";
                let string = array.join("");
                input.value = string + key;
            }
            else if (input?.value.length === 12) {
                let array = input.value.split("");
                array[11] = "-";
                let string = array.join("");
                input.value = string + key;
            }
        }
        else if(input && key !== "Backspace") {
            let array = input.value.split("");
            array.pop();
            const string = array.join("");

            input.value = string;
        }

    }

    function maskTel(key: string) {
        const input = ref.current;

        const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        if(key in numberKeys) {            
            if(input?.value.length === 2) {
                let newString = `(${input.value}) `;
                input.value = newString;
            }
            else if(input?.value.length === 6) {
                let newString = `${input.value} `;
                input.value = newString;
            }
            else if(input?.value.length === 11) {
                let newString = `${input.value}-`;
                input.value = newString;
            }
            else if(input?.value.length === 5) {
                let array = input.value.split("");
                array[4] = " ";
                let string = array.join("");
                input.value = string + key;
            }
            else if(input?.value.length === 7) {
                let array = input.value.split("");
                array[6] = " ";
                let string = array.join("");
                input.value = string + key;
            }
            else if(input?.value.length === 12) {
                let array = input.value.split("");
                array[11] = "-";
                let string = array.join("");
                input.value = string + key;
            }
        }

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange ? onChange(e.target.value) : null;

        if(inputType === "cpf") {
            maskCpf(key);

            if(refInput?.current && ref.current) {
                refInput.current.value = ref.current.value.replace(/\D/g, "");
            }
            return
        }
        else if(inputType === "tel")  {
            maskTel(key);

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
        <div className="flex flex-col justify-center relative w-full">
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl ${inputType === "submit" ? "hidden" : null} ${inputType === "cpf" ? "uppercase" : "capitalize"}`} htmlFor={inputType}>{label ? label : inputType}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input maxLength={inputType === "cpf" ? 14 : inputType === "tel" ? 16 : undefined} type={inputType} value={inputType === "submit" ? inputType : undefined} onChange={e => handleChange(e)} onKeyDown={e => setKey(e.key)} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className={` h-12 ${baseColor} rounded-xl px-4 text-xl ${inputType === "submit" ? `cursor-pointer hover:${baseColor}/60 transition-all` : null}`} id={inputType} />
        </div>
    );
}
 
export default Input;