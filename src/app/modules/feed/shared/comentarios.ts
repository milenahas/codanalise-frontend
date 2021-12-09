import { Usuario } from "../../usuario/shared/usuario";

export interface Comentarios {
    autorComent?: Usuario;
    comentario?: string;
    dt_com?: string;
    id?: number;
    postagem_id?: number;
}