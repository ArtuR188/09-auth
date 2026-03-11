import { Note, NoteTag } from '@/types/note';
import { User } from '@/types/user';
import { cookies } from 'next/headers';
import api from './api';

const getHeaders = () => {
  const cookieStore = cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: NoteTag;
}) => {
  const { data } = await api.get('/notes', {
    params: { ...params, perPage: 12 },
    headers: getHeaders(),
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: getHeaders(),
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me', {
    headers: getHeaders(),
  });
  return data;
};

export const checkSession = async () => {
  const response = await api.get('/auth/session', {
    headers: getHeaders(),
  });
  return response;
};