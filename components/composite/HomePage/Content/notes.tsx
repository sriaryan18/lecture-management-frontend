import Editor from '@/components/ui/rich-text-editor/editor';
import { useState } from 'react';

export default function Notes({
  initialValue,
  isEditable,
}: Readonly<{ initialValue: string; isEditable: boolean }>) {
  const [notes, setNotes] = useState(initialValue);

  const onchangeNotes = (notes: string) => {
    setNotes(notes);
  };

  return (
    <div className="flex-1 h-full w-full">
      <Editor isEditable={isEditable} onChange={onchangeNotes} initialState={notes} />
    </div>
  );
}
