import { CREATE_LECTURE_MUTATION } from '@/garphql/instructor/mutation/lecture';
import { GET_LECTURE_BY_ID } from '@/garphql/students/queries/lectures';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { useMutation, useQuery } from '@apollo/client';
import { z } from 'zod';
import { useAuth } from './store/useAuth';
import { toast } from 'sonner';
import { useClassrooms } from './useClassrooms';

export const useLecture = (lectureId?: string) => {
  const { user } = useAuth();
  const { refetch: refetchClassrooms } = useClassrooms(user?.role as 'STUDENT' | 'TEACHER');

  // Query logic - only run if lectureId is provided
  const {
    data: lectureData,
    loading: queryLoading,
    error: queryError,
    refetch: refetchLecture,
  } = useQuery(GET_LECTURE_BY_ID, {
    variables: { lectureId: lectureId ?? '' },
    skip: !lectureId, // Skip query if no lectureId provided
  });

  // Mutation logic
  const [createLecture, { loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_LECTURE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Lecture created successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleCreateLecture = async (data: z.infer<typeof addLectureFormSchema>) => {
    await createLecture({
      variables: {
        ...data,
      },
    });
    refetchClassrooms();
  };

  return {
    // Query related
    lecture: lectureData?.getLectureById || null,
    loading: queryLoading,
    error: queryError,
    refetchLecture,
    // Mutation related
    handleCreateLecture,
    createLoading: mutationLoading,
    createError: mutationError,
  };
};
