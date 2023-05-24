
export class Exeptions extends Error{
    public message: string;
    public status: number;
    
    constructor(message: string, status: number){
        super(message);
        this.message = message;
        this.status = status;
    }
}