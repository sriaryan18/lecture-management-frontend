import { useState } from 'react';
import { BaseInput } from '@/components/BaseComponents/Input';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';

export default function JoinClassroom({
  handleSubmit,
}: Readonly<{
  handleSubmit: (data: string) => void;
}>) {
  const [classroomCode, setClassroomCode] = useState('');

  return (
    <DialogContent className="max-w-md">
      <div className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Join Classroom</DialogTitle>
          <DialogDescription>Enter the classroom code to join the classroom</DialogDescription>
        </DialogHeader>
        <BaseInput
          name="classroomCode"
          value={classroomCode}
          onChange={(e) => setClassroomCode(e.target.value)}
          placeholder="Enter classroom code"
        />
        <Button type="submit" className="w-full" onClick={() => handleSubmit(classroomCode)}>
          Join Classroom
        </Button>
      </div>
    </DialogContent>
  );
}
