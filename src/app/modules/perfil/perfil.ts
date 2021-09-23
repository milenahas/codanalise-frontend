export class Perfil {
  id: number;
  nome: string;
  sobrenome: string;
  imagemUrl: string;
  email: string;
  sobre: string;
  github: string;
  linkedin: string;
  escolaridade: {
    instituicao: string;
    nivel: string;
    dataInicio: string;
    dataFim: string;
  };
  experiencia: {
    empresa: string;
    cargo: string;
    dataInicio: string;
    dataFim: string;
  };
  hardSkill: {
    ferramenta: string;
    nivel: string;
    desc: string;
  };
}
