export interface IPatio {
  id: string;
  nome: string;
  vagasDisponiveis: number;
  vagasOcupadas: number;
  valorHora: number;
}

export interface ICliente {
  cpf: string;
  modelo: string;
  placa: string;
  cor: string;
  idPatio: string;
  horaEntrada: number;
}

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
  tipo: 'Administrador' | 'Funcionário(a)';
}
