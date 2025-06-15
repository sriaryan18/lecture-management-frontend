'use client';
import { Button } from '@/components/ui/button';
import { Book, Copy, Menu, School, Share, Users } from 'lucide-react';
import z from 'zod';
import { useMemo, useState } from 'react';
import AddNewLecture from '../Forms/Instructor/AddNewLecture';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/store/useAuth';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { useParams } from 'next/navigation';
import AddNewClassroom from '../Forms/Instructor/AddNewClassroom';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';

import { useClassrooms } from '@/hooks/useClassrooms';
import { useLecture } from '@/hooks/useLecture';

import LectureInvite from '../Forms/Instructor/ClassroomInvite';
import { toast } from 'sonner';

import ToolbarCommons from './ToolbarCommons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ManageStudents from '../Forms/Instructor/ManageStudents';

export default function InstructorToolbar() {
  const [isModalOpen, setIsModalOpen] = useState<
    'lecture' | 'classroom' | 'invite' | 'manageStudents' | null
  >(null);
  const { user } = useAuth();

  const {
    handleCreateClassroom,
    createLoading: classroomLoading,
    createError: classroomError,
    handleCreateInvite,
    inviteLinkLoading,
    inviteLinkError,
    currentClassroom,
    allClassroomsMetadata,
  } = useClassrooms();
  const {
    handleCreateLecture,
    createLoading: lectureLoading,
    createError: lectureError,
  } = useLecture();
  const { classroomId } = useParams();

  const handleSaveLecture = (data: z.infer<typeof addLectureFormSchema>) => {
    handleCreateLecture(data);
    setIsModalOpen(null);
  };
  const handleSaveClassroom = (data: z.infer<typeof addClassRoomFormSchema>) => {
    handleCreateClassroom(data);
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
            error={lectureError || undefined}
            classrooms={allClassroomsMetadata}
          />
        );

      case 'classroom':
        return (
          <AddNewClassroom
            onSubmit={handleSaveClassroom}
            loading={classroomLoading}
            error={classroomError || undefined}
          />
        );
      case 'invite':
        return (
          <LectureInvite
            classroomId={classroomId as string}
            allClassrooms={allClassroomsMetadata}
            createInvite={handleCreateInvite}
            loading={inviteLinkLoading}
            error={inviteLinkError || undefined}
          />
        );
      case 'manageStudents':
        return <ManageStudents classroomId={classroomId as string} />;
    }
    return null;
  }, [isModalOpen]);

  const inviteLink = useMemo(() => {
    const link = currentClassroom?.inviteLink;
    const expiry = currentClassroom?.inviteLinkExpiry;
    if (link && expiry && new Date(expiry) > new Date()) {
      return { link, expiry };
    }
    return null;
  }, [currentClassroom]);

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

      <div className="flex flex-row gap-2 justify-center  items-end m-2 ">
        <Dialog modal={true} onOpenChange={(open) => !open && setIsModalOpen(null)}>
          <DialogTrigger asChild>
            <div className="flex flex-row gap-2">
              {inviteLink?.link && (
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink.link);
                    toast.success('Invite link copied to clipboard');
                  }}
                  className=""
                >
                  <Copy /> Copy Invite Link
                </Button>
              )}
              <Button onClick={() => setIsModalOpen('classroom')} className="bg-red-500 text-white">
                <School /> Add Classroom
              </Button>
              <Button onClick={() => setIsModalOpen('lecture')} className="bg-green-500 text-white">
                <Book /> Add Lecture
              </Button>
              {!inviteLink && (
                <Button
                  onClick={() => setIsModalOpen('invite')}
                  className="bg-blue-500 text-white"
                  disabled={true}
                >
                  <Share /> Create Classroom Invite
                </Button>
              )}
              <Popover>
                <PopoverTrigger asChild>
                 {currentClassroom && <Button variant="outline">
                    <Menu />
                  </Button>}
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" asChild>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => setIsModalOpen('manageStudents')}
                    >
                      <Users /> Manage Students
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </DialogTrigger>
          {isModalOpen && dialogContent}
        </Dialog>
      </div>
    </div>
  );
}
