import { CREATE_LECTURE_MUTATION } from '@/garphql/instructor/mutation/lecture';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { RootState } from '@/store';
import { setClassroomLectures } from '@/store/slices/classroom-lecture-slice';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

export const useLectureMutation = (refetchLecture: () => void) => {
  const dispatch = useDispatch();
  const { classroomLectures } = useSelector((state: RootState) => state.classroomLecture);
  const [createLecture, { loading: mutationLoading, error: mutationError }] = useMutation(
    CREATE_LECTURE_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Lecture created successfully');
        const allClassrooms = classroomLectures?.data?.map((classroom: any) => {
          if (classroom.id === data.createLecture.classroomId) {
            return {
              ...classroom,
              lectures: [...classroom.lectures, data.createLecture.id],
            };
          }
          return classroom;
        });

        dispatch(setClassroomLectures({ data: allClassrooms }));
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

    // refetchLecture();
  };

  return {
    createLecture,
    createLoading: mutationLoading,
    createError: mutationError,
    handleCreateLecture,
  };
};
