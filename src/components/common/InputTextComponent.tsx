import React, { useEffect, useState } from "react";

const InputText = (props: { numbersOnly: true; ipValue: number;
     parentCallBack: (arg0: string) => void; }) => {

    const [
        inputValue, setInputValue
    ] = useState<number>(0);

    useEffect(() => {
        props && props.ipValue ? setInputValue(props.ipValue) : setInputValue(0);
    }, [
        props
    ]);
    const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {

        if (props.numbersOnly) {
            const regExp = new RegExp(/^\d*\.?\d*$/);
            if (evt.target.value === "" || regExp.test(evt.target.value)) {
                props.parentCallBack(evt.target.value);
                setInputValue(Number(evt.target.value));
            }
        }        
    };

    return (
        <>
            <input 
                type= "text"
                className="common-input"
                value= {inputValue}
                onChange={(evt) => {
                    return onChangeInput(evt); 
                }}
            />
        </>
    );
};

export default InputText;
