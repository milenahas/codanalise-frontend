import { Usuario } from "../../usuario/shared/usuario";

export interface MentorPagamento {
    ativo?: boolean;
    id?: number;
    usuario?: Usuario;
}

