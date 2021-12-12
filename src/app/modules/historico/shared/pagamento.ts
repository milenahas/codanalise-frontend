import { Propostas } from "../../feed/shared/propostas";
import { Usuario } from "../../usuario/shared/usuario";
import { MentorPagamento } from "./mentorPagamento";

export interface Pagamento {
    aluno: Usuario;
    cdv: string;
    hora: string;
    id: number;
    mentor_pag: MentorPagamento;
    nro_cartao: string;
    proposta: Propostas;
    vl_pago: number;
}