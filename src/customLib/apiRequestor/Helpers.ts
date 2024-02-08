export const isEmpty = (variable: any) => {
    const type = typeof variable;
    if (variable === null) return true;
    if (type === "undefined") return true;
    if (type === "boolean") return false;
    if (type === "string") return !variable.trim();
    if (type === "number") return false;
    if (Array.isArray(variable)) return !variable.length;
    if (type === "object") return !Object.keys(variable).length;
    return !variable;
};

export const isNonEmpty = (variable: any) => {
    return !isEmpty(variable);
};
