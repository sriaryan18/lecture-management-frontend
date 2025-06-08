import { CREATE_CLASSROOM_MUTATION } from '@/garphql/instructor/mutation/classrooms';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';
import { useMutation } from '@apollo/client';
import { z } from 'zod';
import { useAuth } from '../store/useAuth';
import { toast } from 'sonner';
import { useClassrooms as useClassroomsQuery } from '../query/useClassrooms';

export const useClassrooms = () => {
  const { user } = useAuth();
  const { refetch } = useClassroomsQuery(user?.role as 'STUDENT' | 'TEACHER');

  const [createClassroom, { loading, error }] = useMutation(CREATE_CLASSROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Classroom created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateClassroom = async (data: z.infer<typeof addClassRoomFormSchema>) => {
    await createClassroom({
      variables: {
        description: data.description,
        classroomName: data.classroomName,
        instructorIds: [user?.id ?? ''],
      },
    });
    refetch();
  };

  return { handleCreateClassroom, loading, error };
};
