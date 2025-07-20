import {
  ADD_STUDENTS_IN_CLASSROOM_MUTATION,
  CREATE_CLASSROOM_MUTATION,
  CREATE_INVITE_LINK_MUTATION,
} from '@/garphql/instructor/mutation/classrooms';
import { GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID } from '@/garphql/instructor/queries/classrooms';
import { GET_ALL_CLASSROOMS_BY_STUDENT_ID } from '@/garphql/students/queries/classrooms';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';
import { shareClassroomInviteSchema } from '@/models/share-classroom-invite';
import { useMutation, useQuery } from '@apollo/client';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '../store/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setClassroomLectures } from '@/store/slices/classroom-lecture-slice';
import { RootState } from '@/store';
import { useParams } from 'next/navigation';
import { JOIN_CLASSROOM_BY_CODE } from '@/garphql/students/mutation/classroom';

export const useClassroomsMutation = (role?: 'STUDENT' | 'TEACHER' | 'ADMIN', refetch?: any) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userRole = role || (user?.role as 'STUDENT' | 'TEACHER');
  const { classroomLectures } = useSelector((state: RootState) => state.classroomLecture);
  const { classroomId } = useParams();
  const currentClassroom = useMemo(() => {
    return classroomLectures?.data?.find((classroom: any) => classroom.id === classroomId);
  }, [classroomLectures, classroomId]);

  // Query logic

  // Mutation logic
  const [createClassroom, { loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_CLASSROOM_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Classroom created successfully');
        dispatch(
          setClassroomLectures({
            data: [...(classroomLectures?.data || []), data?.createClassroom],
          }),
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleCreateClassroom = async (data: z.infer<typeof addClassRoomFormSchema>) => {
    if (userRole === 'TEACHER') {
      // only teachers can create classrooms

      await createClassroom({
        variables: {
          description: data.description,
          classroomName: data.classroomName,
          instructorIds: [user?.id ?? ''],
          organizationId: user?.organizationId ?? '',
        },
      });
      // refetch?.();
    }
  };

  const [createInviteLink, { loading: inviteLinkLoading, error: inviteLinkError }] = useMutation(
    CREATE_INVITE_LINK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invite link created successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleCreateInvite = async (data: z.infer<typeof shareClassroomInviteSchema>) => {
    const { data: inviteLinkData } = await createInviteLink({
      variables: {
        classroomId: data.classroomId,
        expiry: data.expiresAt,
      },
    });
    if (currentClassroom) {
      currentClassroom.inviteLink = inviteLinkData.createInviteLink;
    }
    return inviteLinkData;
  };

  const [joinClassroom, { loading: joinClassroomLoading, error: joinClassroomError }] = useMutation(
    JOIN_CLASSROOM_BY_CODE,
    {
      onCompleted: () => {
        toast.success('Classroom joined successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleJoinClassroom = async (inviteLink: string) => {
    await joinClassroom({
      variables: {
        classroomCode: inviteLink,
        studentId: user?.username ?? '',
        organizationId: user?.organizationId ?? '',
      },
    });
    refetch();
  };

  const allClassroomsMetadata = useMemo(() => {
    return classroomLectures?.data?.map((classroom: any) => ({
      id: classroom.id,
      name: classroom.classroomName,
      code: classroom.classroomCode,
    }));
  }, [classroomLectures]);

  const inviteLink = useMemo(() => {
    return currentClassroom?.inviteLink;
  }, [currentClassroom]);

  const [
    addStudentToClassroom,
    { loading: addStudentToClassroomLoading, error: addStudentToClassroomError },
  ] = useMutation(ADD_STUDENTS_IN_CLASSROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Student added to classroom successfully');
      // dispatch(setClassroomLectures({ data: rawData?.getClassroomsByInstructorId }));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddStudentToClassroom = async (studentIds: string[]) => {
    const classroom = await addStudentToClassroom({
      variables: { classroomId: currentClassroom?.id ?? '', studentIds },
    });

    if (classroom.data?.addStudentsInClassRoom) {
      const newClassroom = classroom.data.addStudentsInClassRoom;
      const allClassrooms = classroomLectures?.data?.map((classroom: any) =>
        classroom.id === newClassroom.id ? newClassroom : classroom,
      );
      dispatch(setClassroomLectures({ data: allClassrooms }));
    }
  };

  return {
    // Mutation related
    handleCreateClassroom,
    createLoading: mutationLoading,
    createError: mutationError,
    handleCreateInvite,
    inviteLinkLoading,
    inviteLinkError,
    currentClassroom,
    classroomLectures,
    allClassroomsMetadata,
    classroomId,
    handleJoinClassroom,
    joinClassroomLoading,
    joinClassroomError,
    handleAddStudentToClassroom,
    addStudentToClassroomLoading,
    addStudentToClassroomError,
  };
};
