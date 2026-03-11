'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useParams } from 'next/navigation';
import css from './NoteDetails.client.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!note) return null;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>{note.tag}</span>
    </div>
  );
}