import { Pessoa } from './Pessoa'

export interface AnaliseComentario {
    usuario: {
        type: Pessoa
    };
    comentario:{
        type: String,
    };
    resultado: {
        type: JSON,
    }
    
}