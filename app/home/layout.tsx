'use client';
import ClassroomsLectures from '@/components/composite/HomePage/Content/classrooms-lectures';
import Header from '@/components/composite/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/store/useAuth';
import { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import { useLectureMutation } from '@/hooks/lecture/useLectureMutation';
import { Toolbar } from '@/components/composite/HomePage/Toolbar';
import { useLectureQuery } from '@/hooks/lecture/useLectureQuery';
import { useParams } from 'next/navigation';
import { useClassroomsMutation } from '@/hooks/classrooms/useClassroomsMutation';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { lectureId, classroomId } = useParams();
  const { user, role } = useAuth();

  const toolbarPermissions = useMemo<{
    createClassroom: boolean;
    createInvite: boolean;
    createLecture: boolean;
    createManageStudents: boolean;
  }>(() => {
    if (role === 'STUDENT') {
      return {
        createClassroom: false,
        createInvite: false,
        createLecture: false,
        createManageStudents: false,
      };
    } else {
      return {
        createClassroom: true,
        createInvite: false,
        createLecture: true,
        createManageStudents: true,
      };
    }
  }, [role]);

  // const customerType = user?.customerType ?? 'student';
  const { refetchLecture } = useLectureQuery(lectureId as string, classroomId as string, true);

  const { handleCreateLecture, createLoading, createError } = useLectureMutation(refetchLecture);
  const {
    handleCreateClassroom,
    createLoading: classroomLoading,
    createError: classroomError,
    allClassroomsMetadata,
    handleAddStudentToClassroom,
    currentClassroom,
  } = useClassroomsMutation(role);

  return (
    <div className=" flex flex-col space-x-2">
      <Header />
      <SidebarProvider>
        <ClassroomsLectures />

        <div className=" w-full flex-grow flex flex-col">
          <div className="flex flex-col overflow-y-auto w-full border-b border-gray-200 ">
            <Toolbar
              {...toolbarPermissions}
              classroomId={classroomId as string}
              instructorId={user?.id as string}
              handleSaveLecture={handleCreateLecture}
              classrooms={allClassroomsMetadata}
              loading={createLoading}
              error={createError as ApolloError}
              handleCreateClassroom={handleCreateClassroom}
              classroomLoading={classroomLoading}
              classroomError={classroomError as ApolloError}
              handleAddStudentToClassroom={handleAddStudentToClassroom}
              currentClassroom={currentClassroom}
            />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
