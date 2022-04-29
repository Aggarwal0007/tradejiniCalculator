import React, { useEffect, useState } from "react";

type PropsTypes = { 
    numbersOnly: boolean;
     ipValue: number | string;
     isDecimal?: boolean;
    parentCallBack: (arg0: string) => void; 
}

const InputText = (props: PropsTypes) => {

    const [
        inputValue, setInputValue
    ] = useState<string | number>("0");

    useEffect(() => {
        props && props.ipValue ? setInputValue(props.ipValue) : setInputValue(0);
    }, [
        props
    ]);
    const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {

        let regExp = new RegExp(/^\d*\.?\d*$/);

        if (props.isDecimal) {
            regExp = new RegExp(/^\d*\.?\d*$/);
        } 

        if (props.numbersOnly) {
            regExp = new RegExp(/^[0-9]*$/);
        }   
        
        if (evt.target.value === "" || regExp.test(evt.target.value)) {
            props.parentCallBack(evt.target.value);
            setInputValue(evt.target.value);
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
