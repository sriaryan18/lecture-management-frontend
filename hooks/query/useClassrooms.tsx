import { GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID } from '@/garphql/instructor/queries/classrooms';
import { GET_ALL_CLASSROOMS_BY_STUDENT_ID } from '@/garphql/students/queries/classrooms';
import { useQuery } from '@apollo/client';
import { useAuth } from '../store/useAuth';
import { useEffect, useMemo } from 'react';
import { setClassroomLectures } from '@/store/slices/classroom-lecture-slice';
import { useDispatch } from 'react-redux';

export const useClassrooms = (role: 'STUDENT' | 'TEACHER') => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const getQuery = () => {
    if (role === 'STUDENT') {
      return {
        query: GET_ALL_CLASSROOMS_BY_STUDENT_ID,
        variables: { studentId: user?.username ?? '' },
      };
    }
    return {
      query: GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID,
      variables: { instructorID: user?.id ?? '' },
    };
  };

  const {
    data: rawData,
    loading,
    error,
    refetch,
  } = useQuery(getQuery().query, {
    variables: getQuery().variables,
  });

  // Transform data to return directly without query name nesting
  const data = useMemo(() => {
    if (role === 'STUDENT') {
      return rawData?.getClassroomsByStudentIds ?? [];
    }
    return rawData?.getClassroomsByInstructorId ?? [];
  }, [rawData, role]);

  useEffect(() => {
    if (rawData) {
      if (role === 'TEACHER') {
        dispatch(setClassroomLectures({ data: rawData.getClassroomsByInstructorId }));
      } else {
        dispatch(setClassroomLectures({ data: rawData.getClassroomsByStudentIds }));
      }
    }
  }, [rawData, dispatch, role]);

  return { data, loading, error, refetch };
};
