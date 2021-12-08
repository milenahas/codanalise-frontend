import { Mentor } from "./mentor";

export interface Propostas {
        comentario?: string,
        dt_prop?: string,
        estado?: string,
        id?: number,
        mentor?: Mentor;
        postagem_id?: number,
        valor?: number
}