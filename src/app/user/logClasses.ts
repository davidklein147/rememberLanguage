export class Logup {
    name: string;
    email: string;
    password: string
    
    constructor(name?: string, email?: string, password?: string){
        this.name = name||"";
        this.email = email||"";
        this.password = password||"";
    }

  
}

export class Login{
    email: string;
    password: string;
    
    constructor(){
        this.email = "";
        this.password = "";
    }
}

export interface DataLogin{
    token: string;
    userId: number;
}
