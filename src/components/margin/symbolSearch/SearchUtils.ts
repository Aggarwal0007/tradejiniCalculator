export const splitResponse = (response: string, idSeparator: string, stringSeparator: string): Array<Array<string>> => {
    return response.split(idSeparator).map((index: string) => {
        return index.split(stringSeparator);
    });
};

export const splitId = (ids: string, idFormat: string) => {
    const idQuery = `${idFormat}~${ids}`;
    const queryResp = splitResponse(idQuery, "~", "_");
    const [
        keys, ...values
    ] = queryResp;

    const parsedSymArrayData = values.map((value: Array<string>) => {
        const unMapSymResp = keys.reduce((obj: { [key: string]: string }, key: string, inx: number) => {
            obj[ key ] = value[ inx ];
            return obj;
        }, {});

        return unMapSymResp;
        
    });

    return parsedSymArrayData[ 0 ];
};
