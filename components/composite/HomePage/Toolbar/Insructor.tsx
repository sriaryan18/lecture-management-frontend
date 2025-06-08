'use client';
import { Button } from '@/components/ui/button';
import { Book, School, Share } from 'lucide-react';
import z from 'zod';
import { useMemo, useState } from 'react';
import AddNewLecture from '../Forms/Instructor/AddNewLecture';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/store/useAuth';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { useParams } from 'next/navigation';
import AddNewClassroom from '../Forms/Instructor/AddNewClassroom';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';

import { useClassrooms } from '@/hooks/mutation/useClassrooms';
import { useLecture } from '@/hooks/mutation/useLecture';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import LectureInvite from '../Forms/Instructor/ClassroomInvite';
import { shareClassroomInviteSchema } from '@/models/share-classroom-invite';

export default function InstructorToolbar() {
  const [isModalOpen, setIsModalOpen] = useState<'lecture' | 'classroom' | 'invite' | null>(null);
  const { user } = useAuth();

  const {
    handleCreateClassroom,
    loading: classroomLoading,
    error: classroomError,
  } = useClassrooms();
  const { handleCreateLecture, loading: lectureLoading, error: lectureError } = useLecture();
  const { classroomId } = useParams();

  const { classroomLectures } = useSelector((state: RootState) => state.classroomLecture);

  const handleSaveLecture = (data: z.infer<typeof addLectureFormSchema>) => {
    handleCreateLecture(data);
    setIsModalOpen(null);
  };
  const handleSaveClassroom = (data: z.infer<typeof addClassRoomFormSchema>) => {
    handleCreateClassroom(data);
    setIsModalOpen(null);
  };
  const handleCreateInvite = (data: z.infer<typeof shareClassroomInviteSchema>) => {
    console.log(data);
    setIsModalOpen(null);
  };
  const dialogContent = useMemo(() => {
    switch (isModalOpen) {
      case 'lecture':
        return (
          <AddNewLecture
            classroomId={classroomId as string}
            instructorId={user?.id ?? ''}
            handleSaveLecture={handleSaveLecture}
            loading={lectureLoading}
            error={lectureError}
            classrooms={classroomLectures?.data?.map((classroom: any) => ({
              name: classroom.classroomName,
              id: classroom.id,
            }))}
          />
        );

      case 'classroom':
        return (
          <AddNewClassroom
            onSubmit={handleSaveClassroom}
            loading={classroomLoading}
            error={classroomError}
          />
        );
      case 'invite':
        return (
          <LectureInvite
            classroomId={classroomId as string}
            allClassrooms={classroomLectures?.data?.map((classroom: any) => ({
              name: classroom.classroomName,
              id: classroom.id,
            }))}
            createInvite={handleCreateInvite}
          />
        );
    }
    return null;
  }, [isModalOpen]);

  return (
    <div className="flex flex-col justify-center  items-end m-2">
      <Dialog onOpenChange={(open) => !open && setIsModalOpen(null)} modal={true}>
        <DialogTrigger asChild>
          <div className="flex flex-row gap-2">
            <Button onClick={() => setIsModalOpen('classroom')} className="bg-red-500 text-white">
              <School /> Add Classroom
            </Button>
            <Button onClick={() => setIsModalOpen('lecture')} className="bg-green-500 text-white">
              <Book /> Add Lecture
            </Button>
            <Button onClick={() => setIsModalOpen('invite')} className="bg-blue-500 text-white">
              <Share /> Create Classroom Invite
            </Button>
          </div>
        </DialogTrigger>
        {isModalOpen && dialogContent}
      </Dialog>
    </div>
  );
}
