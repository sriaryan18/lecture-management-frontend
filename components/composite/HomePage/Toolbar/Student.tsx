import { useClassrooms } from '@/hooks/useClassrooms';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Copy } from 'lucide-react';
import { useMemo, useState } from 'react';
import JoinClassroom from '../Forms/Students/JoinClassroom';
import ToolbarCommons from './ToolbarCommons';

export default function StudentToolbar() {
  const [isModalOpen, setIsModalOpen] = useState<'join' | null>(null);

  const { currentClassroom, handleJoinClassroom: handleJoinClassroomMutation } =
    useClassrooms('STUDENT');

  const handleJoinClassroom = (inviteLink: string) => {
    handleJoinClassroomMutation(inviteLink);
    setIsModalOpen(null);
  };

  const getModalContent = useMemo(() => {
    switch (isModalOpen) {
      case 'join':
        return <JoinClassroom handleSubmit={handleJoinClassroom} />;
      default:
        return null;
    }
  }, [isModalOpen]);

  return (
    <div
      className={`flex flex-row pl-2 shadow-lg  items-center  border-b border-gray-200  justify-between`}
    >
      {currentClassroom ? (
        <ToolbarCommons>
          <ToolbarCommons.ClassroomInfo
            className={currentClassroom?.classroomName}
            classCode={currentClassroom?.classroomCode}
          />
        </ToolbarCommons>
      ) : (
        <h1 className="text-xl font-semibold">Home</h1>
      )}

      <div className="flex flex-col justify-center  items-end m-2 ">
        <Dialog modal={true} onOpenChange={(open) => !open && setIsModalOpen(null)}>
          <DialogTrigger asChild>
            <div className="flex flex-row gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen('join')} className="">
                <Copy /> Join Classroom
              </Button>
            </div>
          </DialogTrigger>

          {isModalOpen && getModalContent}
        </Dialog>
      </div>
    </div>
  );
}
