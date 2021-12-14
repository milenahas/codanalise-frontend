import { Pagamento } from "./pagamento";

export interface Aula {
	id?: number;
	pagamento?: Pagamento;
	hora?: string;
	id_mentor?: number;
	id_usuario?: number;
	conf_mentor?: boolean;
	conf_usuario?: boolean;
}