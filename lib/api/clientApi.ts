import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';
import api from './api';

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: NoteTag;
}) => {
  const { data } = await api.get('/notes', {
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', credentials);
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', credentials);
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
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
};