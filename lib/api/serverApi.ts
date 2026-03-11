import { User } from '@/types/user';
import { cookies } from 'next/headers';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const getHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/notes`, {
    params: { ...params, perPage: 12 },
    headers,
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/users/me`, { headers });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/auth/session`, { headers });
  return data;
};