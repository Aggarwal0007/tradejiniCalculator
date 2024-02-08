export default class CommonError extends Error {
    errorID: string | number = "";

    echo: string = "";

    constructor(message: string) {
        super(message);
        this.name = "CommonError";
        this.errorID = "";
        this.echo = "";
    }
}
