import { Pessoa } from './pessoa'

export interface AnaliseTexto {
    usuario: {
        type: Pessoa
    };
    texto:{
        type: String,
    };
    resultado: {
        type: JSON,
    };
    
}