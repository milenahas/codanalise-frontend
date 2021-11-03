import { Usuario } from "src/app/modules/usuario/shared/usuario";

export interface Publicacao {
  autor: Usuario;
  datapostagem: string;
  id: number;
  propostas: {};

}
