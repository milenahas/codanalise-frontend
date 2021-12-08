import { Usuario } from "../../usuario/shared/usuario";

export interface Mentor {
    ativo?: boolean,
    id?: number,
    usuario?: Usuario;
}