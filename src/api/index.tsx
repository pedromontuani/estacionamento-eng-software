import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apipatios.herokuapp.com/api/',
});

export const getRendimentos = async () => {
  return await api.get('/rendimentos');
};

export const getAllUsuarios = async () => await api.get('/usuarios');

export const findUsuarioByEmailAndPassoword = async (
  email: string,
  password: string,
) => {
  return await api.post('/usuarios', {email, password});
};

export const getPatios = async () => await api.get('/patios');

export const getClientesByIdPatio = async (idPatio: string) =>
  await api.get(`/patios/${idPatio}/clientes`);
