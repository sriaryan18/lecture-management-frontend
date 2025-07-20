import { useQuery } from '@apollo/client';
import { GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID } from '@/garphql/instructor/queries/classrooms';
import { setClassroomLectures } from '@/store/slices/classroom-lecture-slice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../store/useAuth';
import { GET_ALL_CLASSROOMS_BY_STUDENT_ID } from '@/garphql/students/queries/classrooms';

export const useClassroomQuery = (role?: 'STUDENT' | 'TEACHER' | 'ADMIN') => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const getClassroomsByRole = (role: 'STUDENT' | 'TEACHER' | 'ADMIN' | undefined) => {
    if (role === 'STUDENT') {
      return GET_ALL_CLASSROOMS_BY_STUDENT_ID;
    }
    return GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID;
  };

  const { data, loading, error } = useQuery(getClassroomsByRole(role), {
    variables: {
      ...(role === 'STUDENT' ? { studentId: user?.id } : { instructorID: user?.id }),
    },
    onCompleted: (data) => {
      dispatch(
        setClassroomLectures({
          data: data?.getClassroomsByInstructorId || data?.getClassroomsByStudentIds,
        }),
      );
    },
  });

  return { data, loading, error };
};
