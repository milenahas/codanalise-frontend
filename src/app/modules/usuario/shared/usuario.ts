import { Escolaridade } from "./escolaridade";
import { Experiencia } from "./experiencia";
import { Linguagem } from "./linguagem";

export interface Usuario {
  id?: number;
  nome?: string;
  sobrenome?: string;
  // cpf?: string;
  contato?: string;
  genero?: string;
  senha?: string;
  email?: string;
  nascimento?: string;
  github?: string;
  linkedin?: string;
  mentor?: boolean;
  sobre?: string;
  escolaridade?: Escolaridade[];
  exp?: Experiencia[];
  linguagem?: Linguagem[];
  status?: string;
}
