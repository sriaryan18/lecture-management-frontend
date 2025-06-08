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
  const [inviteLink, setInviteLink] = useState('');

  return (
    <DialogContent className="max-w-md">
      <div className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Join Classroom</DialogTitle>
          <DialogDescription>Enter the invite link to join the classroom</DialogDescription>
        </DialogHeader>
        <BaseInput
          name="inviteLink"
          value={inviteLink}
          onChange={(e) => setInviteLink(e.target.value)}
          placeholder="Enter invite link"
        />
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleSubmit(inviteLink)}
        >
          Join Classroom
        </Button>
      </div>
    </DialogContent>
  );
}
