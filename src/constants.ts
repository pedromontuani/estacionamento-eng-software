import {IEstacionamentoState} from './store/slices/estacionamento-slice';

export const initialState: IEstacionamentoState = {
  patios: [],
  clientes: [],
  usuarios: [
    {
      nome: 'Admin',
      email: 'admin@estacionamento.com',
      senha: '123456',
      tipo: 'Administrador',
    },
  ],
  usuarioLogado: null,
  rendimento: 0,
};
