export const getSellPrice = (buyPrc: number): number => {

    return buyPrc > 9999 ? buyPrc + 200 : buyPrc + 2;
};
