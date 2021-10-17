import { Experiencia } from "./experiencia";
import { Linguagem } from "./linguagem";

export interface Usuario {
    nome?: string;
    sobrenome?: string;
    // cpf?: string;
    genero?: string;
    senha?: string;
    email?: string;
    nascimento?: string;
    github?: string;
    linkedin?: string;
    mentor?: boolean;
    sobre?: string;
    exp?: Experiencia[];
    linguagem?: Linguagem[];
}