import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPatio, ICliente, IUsuario} from '../../types';
import {initialState} from '../../constants';

export interface IEstacionamentoState {
  patios: IPatio[];
  clientes: ICliente[];
  usuarios: IUsuario[];
  rendimento: number;
  usuarioLogado: IUsuario | null;
}

interface IAddClienteAction {
  idPatio: string;
  cliente: ICliente;
}

const beneficiosSlice = createSlice({
  name: 'estacionamento',
  initialState,
  reducers: {
    ADD_PATIO: (state, {payload}: PayloadAction<IPatio>) => {
      return {...state, patios: [...state.patios, payload]};
    },
    REMOVE_PATIO: (state, {payload}: PayloadAction<IPatio>) => {
      return {
        ...state,
        patios: state.patios.filter(p => p.id !== payload.id),
        clientes: state.clientes.filter(c => c.idPatio !== payload.id),
      };
    },
    ADD_CLIENTE: (state, {payload}: PayloadAction<IAddClienteAction>) => {
      const clientes = [...state.clientes, payload.cliente];
      const patios = state.patios.map(patio => {
        if (patio.id == payload.idPatio) {
          return {
            ...patio,
            vagasOcupadas: patio.vagasOcupadas + 1,
          };
        }
        return patio;
      });
      return {...state, patios, clientes};
    },
    REMOVE_CLIENTE: (state, {payload}: PayloadAction<ICliente>) => {
      const clientes = state.clientes.filter(c => c.cpf !== payload.cpf);
      let rendimento = 0;
      const patios = state.patios.map(patio => {
        if (patio.id == payload.idPatio) {
          rendimento = patio.valorHora;
          return {
            ...patio,
            vagasOcupadas: patio.vagasOcupadas - 1,
          };
        }
        return patio;
      });
      return {
        ...state,
        patios,
        clientes,
        rendimento: state.rendimento + rendimento,
      };
    },
    ADD_USUARIO: (state, {payload}: PayloadAction<IUsuario>) => {
      return {...state, usuarios: [...state.usuarios, payload]};
    },
    REMOVE_USUARIO: (state, {payload}: PayloadAction<IUsuario>) => {
      return {
        ...state,
        usuarios: state.usuarios.filter(u => u.email !== payload.email),
      };
    },
    SIGN_IN: (state, {payload}: PayloadAction<any>) => {
      return {...state, usuarioLogado: payload};
    },
    SIGN_OUT: state => {
      return {...state, usuarioLogado: null};
    },
  },
});

export const {actions, reducer} = beneficiosSlice;

export const {
  ADD_PATIO,
  REMOVE_PATIO,
  ADD_CLIENTE,
  REMOVE_CLIENTE,
  ADD_USUARIO,
  REMOVE_USUARIO,
  SIGN_OUT,
  SIGN_IN,
} = actions;

export const getRendimentosMensal = (state: IEstacionamentoState) => {
  return {
    labels: ['Janeiro', 'Fevereiro', 'Março'],
    datasets: [
      {
        data: [0, 0, state.rendimento],
      },
    ],
  };
};

export const getRendimentosSemanal = (state: IEstacionamentoState) => {
  return {
    labels: ['01 - 08', '09 - 16', '17 - 22', '23 - 31'],
    datasets: [
      {
        data: [0, 0, 0, state.rendimento],
      },
    ],
  };
};

export const getAllUsuarios = (state: IEstacionamentoState) => state.usuarios;

export const findUsuarioByEmailAndPassoword = (
  usuarios: IUsuario[],
  email: string,
  password: string,
) => {
  return usuarios.find(u => u.email == email && u.senha == password);
};

export const getPatios = (state: IEstacionamentoState) => state.patios;

export const getPatioById = (state: IEstacionamentoState, idPatio: string) =>
  state.patios.find(p => p.id == idPatio);

export const getCarrosByIdPatio = (
  state: IEstacionamentoState,
  idPatio: string,
) => state.clientes.filter(cliente => cliente.idPatio == idPatio);

export const getUsuarios = (state: IEstacionamentoState) => {
  return state.usuarios.filter(u => u.email !== state.usuarioLogado?.email);
};
