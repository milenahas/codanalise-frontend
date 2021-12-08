
import { Usuario } from "../../usuario/shared/usuario"
import { Comentarios } from "./comentarios"
import { Propostas } from "./propostas"
import { Tags } from "./tags"

export interface Postagem {
    id?: number,
    titulo?: string;
    estado?: string,
    datapostagem?: string,
    autor?: Usuario;
    propostas?: Propostas[],
    descricao?: string,
    valor?: number,
    tags?: Tags[],
    comentarios?: Comentarios[];
}