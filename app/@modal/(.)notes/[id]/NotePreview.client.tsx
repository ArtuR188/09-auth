'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <div className={css.container}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
        </div>
      )}
    </Modal>
  );
}