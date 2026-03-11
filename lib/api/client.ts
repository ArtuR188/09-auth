import { User } from '@/types/user';
import api from './api';

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const { data } = await api.get('/notes', {
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/register', credentials);
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean } | null> => {
  const { data } = await api.get('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.patch('/users/me', payload);
  return data;
};