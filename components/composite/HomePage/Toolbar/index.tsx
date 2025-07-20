import usePermissionsTsx from '@/hooks/permissions/usePermissionsTsx';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Book, ChevronDown, Menu, School, Share, Users } from 'lucide-react';
import AddNewLecture from './AddNewLecture';
import { LMSDialog } from '@/components/BaseComponents/lms-dialog';
import AddNewClassroom from './AddNewClassroom';
import { ApolloError } from '@apollo/client';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import z from 'zod';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';
import ManageStudents from './ManageStudents';
import { useMemo } from 'react';
import { LMSDropdown } from '@/components/BaseComponents/lms-dropdown';
import ToolbarCommons from './ToolbarCommons';
// import { addStudentToClassroomFormSchema } from '@/models/add-student-to-classroom';

export function Toolbar({
  classroomId,
  instructorId,
  handleCreateClassroom,
  classroomLoading,
  classroomError,
  createClassroom,
  createInvite,
  createLecture,
  handleSaveLecture,
  classrooms,
  loading,
  error,
  createManageStudents,
  handleAddStudentToClassroom,
  currentClassroom,
}: {
  classroomId: string;
  instructorId: string;
  handleCreateClassroom: (data: z.infer<typeof addClassRoomFormSchema>) => void;
  classroomLoading: boolean;
  classroomError: ApolloError;
  createClassroom: boolean;
  createInvite: boolean;
  createLecture: boolean;
  handleSaveLecture: (data: z.infer<typeof addLectureFormSchema>) => void;
  classrooms: { name: string; id: string }[];
  loading: boolean;
  error: ApolloError;
  createManageStudents: boolean;
  handleAddStudentToClassroom: (data: any) => Promise<void>;
  currentClassroom: { classroomName: string; classroomCode: string };
}) {
  const [modalType, setModalType] = useState<
    'lecture' | 'classroom' | 'invite' | 'manageStudents' | null
  >(null);

  const P = usePermissionsTsx();

  const renderModalContent = useCallback(() => {
    switch (modalType) {
      case 'lecture':
        return (
          <AddNewLecture
            classroomId={classroomId}
            instructorId={instructorId}
            handleSaveLecture={handleSaveLecture}
            classrooms={classrooms}
            loading={loading}
            error={error}
          />
        );
      case 'classroom':
        return (
          <AddNewClassroom
            onSubmit={handleCreateClassroom}
            loading={classroomLoading}
            error={classroomError as ApolloError}
          />
        );
      // case 'invite':
      case 'manageStudents':
        return (
          <ManageStudents
            classroomId={classroomId}
            handleAddStudentToClassroom={handleAddStudentToClassroom}
          />
        );
    }
  }, [
    modalType,
    classroomId,
    instructorId,
    handleSaveLecture,
    classrooms,
    loading,
    error,
    handleCreateClassroom,
    classroomLoading,
    classroomError,
    handleAddStudentToClassroom,
  ]);

  const className = useMemo(() => {
    switch (modalType) {
      case 'manageStudents':
        return 'lg:min-w-[700px] min-w-[300px]  overflow-y-auto';
    }
  }, [modalType]);

  return (
    <div className=" flex p-2 mr-4 justify-between">
      {currentClassroom ? (
        <ToolbarCommons>
          <ToolbarCommons.ClassroomInfo
            className={currentClassroom?.classroomName ?? ''}
            classCode={currentClassroom?.classroomCode ?? ''}
          />
        </ToolbarCommons>
      ) : (
        <h1 className="text-xl font-semibold">Home</h1>
      )}
      <LMSDropdown
        renderTrigger={() => (
          <>
            <Menu />
          </>
        )}
        renderContent={() => (
          <div className="flex flex-col ">
            <P.If condition={createClassroom}>
              <Button
                onClick={() => setModalType('classroom')}
                variant="outline"
                className="border-none"
              >
                <School /> Add Classroom
              </Button>
            </P.If>
            <P.If condition={createInvite}>
              <Button
                onClick={() => setModalType('invite')}
                variant="outline"
                className="border-none"
              >
                <Share /> Create Classroom Invite
              </Button>
            </P.If>
            <P.If condition={createLecture}>
              <Button
                onClick={() => setModalType('lecture')}
                variant="outline"
                className="border-none"
              >
                <Book /> Add Lecture
              </Button>
            </P.If>
            <P.If condition={createManageStudents && !!classroomId}>
              <Button
                onClick={() => setModalType('manageStudents')}
                variant="outline"
                className="border-none"
              >
                <Users /> Manage Students
              </Button>
            </P.If>
          </div>
        )}
      />

      <LMSDialog
        isVisible={!!modalType}
        onClose={() => setModalType(null)}
        title="Add Lecture"
        renderContent={renderModalContent}
        className={className}

        // renderFooter={renderModalContent}
      />
    </div>
  );
}
