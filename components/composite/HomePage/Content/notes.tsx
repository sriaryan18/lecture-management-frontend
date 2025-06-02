import Editor from '@/components/ui/rich-text-editor/editor';
import { useState } from 'react';

export default function Notes({
  initialValue,
  isEditable,
  onChange,
}: Readonly<{ initialValue: string; isEditable: boolean; onChange?: (notes: string) => void }>) {
  const [notes, setNotes] = useState(initialValue);

  const onchangeNotes = (notes: string) => {
    setNotes(notes);
    onChange?.(notes);
  };

  return (
    <div className="flex-1 h-full w-full">
      <Editor isEditable={isEditable} onChange={onchangeNotes} initialState={notes} />
    </div>
  );
}
