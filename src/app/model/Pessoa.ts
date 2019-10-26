
export interface Pessoa {
    nome:{
        type: String,
        required: true,
    };
    email: {
        type: String,
        required: true,
    };
    usuario:{
        type: String,
        required: true,
    };
    senha: {
        type: String,
        required: true,
    };
    userInstagram: {
        type: String,
    };
    mediasInstagram: {
        type: Array<any>,
    }
    
}
