import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apipatios.herokuapp.com/api/',
});

export const getRendimentos = () => {
  return api.get('/rendimentos');
};

export const getAllUsuarios = () => api.get('/usuarios');

export const findUsuarioByEmailAndPassoword = (
  email: string,
  password: string,
) => {
  return api.post('/usuarios', {email, password});
};

export const getPatios = () => api.get('/patios');

export const getClientesByIdPatio = (idPatio: string) =>
  api.get(`/patios/${idPatio}/clientes`);
