import { CREATE_LECTURE_MUTATION } from '@/garphql/instructor/mutation/lecture';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { useMutation } from '@apollo/client';
import { z } from 'zod';
import { useClassrooms } from '../query/useClassrooms';
import { useAuth } from '../store/useAuth';
import { toast } from 'sonner';

export const useLecture = () => {
  const { user } = useAuth();
  const { refetch } = useClassrooms(user?.role as 'STUDENT' | 'TEACHER');
  const [createLecture, { loading, error }] = useMutation(CREATE_LECTURE_MUTATION, {
    onCompleted: () => {
      toast.success('Lecture created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateLecture = async (data: z.infer<typeof addLectureFormSchema>) => {
    await createLecture({
      variables: {
        ...data,
      },
    });
    refetch();
  };

  return { handleCreateLecture, loading, error };
};
