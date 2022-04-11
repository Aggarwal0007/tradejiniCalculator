import { dictionaryList, languageOptions } from "./language";
import React from "react";
import { useConfigStore } from "state/AppConfigReducer";
import { useSelector } from "react-redux";

type selectedLangType = keyof typeof dictionaryList;

type TextProps ={
    readonly textName:string;
    readonly textModule?:string;
}

const AppText = (props:TextProps) => {
    const { textName, textModule } = props;

    const selectedLang = useSelector(useConfigStore).language || languageOptions[ 0 ];
    console.log(selectedLang);
    const dictionary: Record<string, any> = dictionaryList[ selectedLang as selectedLangType ];

    if (textModule)
        return dictionary[ textModule ] && dictionary[ textModule ][ textName ] ?
            dictionary[ textModule ][ textName ]
            : null;

    return <> {dictionary[ textName ] ? dictionary[ textName ] : null} </>;
};

export default AppText;
