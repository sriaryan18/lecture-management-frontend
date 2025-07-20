import { GET_LECTURE_BY_ID } from '@/garphql/students/queries/lectures';
import { useQuery } from '@apollo/client';
import { useAuth } from '../store/useAuth';
import { GET_STUDENT_NOTES } from '@/garphql/students/queries/notes';

export const useLectureQuery = (
  lectureId?: string,
  classroomId?: string,
  skipQueries?: boolean,
) => {
  const { role, user } = useAuth();

  const {
    data: lectureData,
    loading: queryLoading,
    error: queryError,
    refetch: refetchLecture,
  } = useQuery(GET_LECTURE_BY_ID, {
    variables: { lectureId: lectureId ?? '' },
    skip: skipQueries,
  });
  const { data: studentNotes = null } = useQuery(GET_STUDENT_NOTES, {
    variables: {
      lectureId: lectureId ?? '',
      classroomId: classroomId ?? '',
      studentId: user?.id as string,
      role: role,
    },
    skip: !lectureId || !classroomId || role !== 'STUDENT' || skipQueries,
  });

  return {
    lecture: lectureData?.getLectureById || null,
    loading: queryLoading,
    error: queryError,
    refetchLecture,
    studentNotes: studentNotes?.getStudentNotes?.notes || "",
  };
};
