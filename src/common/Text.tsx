import { dictionaryList, languageOptions } from "./language";
import english from "./language/En";
import React from "react";
import store from "state/Store";
import { useConfigStore } from "state/AppConfigReducer";
import { useSelector } from "react-redux";

type selectedLangType = keyof typeof dictionaryList;
type propertyType = keyof typeof english;

type TextProps ={
    readonly textName:string;
    readonly textModule?:string;
}

export const getText = (textName: string, textModule?: string) => {
    
    const selectedLang = useConfigStore(store.getState()).language || languageOptions[ 0 ];

    // const dictionary: Record<string, string | Record<string, string>> = dictionaryList[ selectedLang as selectedLangType ];
    const dictionary: Record<string, any> = dictionaryList[ selectedLang as selectedLangType ];

    if (textModule)
        return dictionary[ textModule ] && dictionary[ textModule ][ textName ] ?
            dictionary[ textModule ][ textName ]
            : null;

    return dictionary[ textName as propertyType ] ? dictionary[ textName as propertyType ] : null;
};

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
