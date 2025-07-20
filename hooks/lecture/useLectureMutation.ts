import {
  ADD_OR_UPDATE_LECTURE_NOTES_MUTATION,
  CREATE_LECTURE_MUTATION,
} from '@/garphql/instructor/mutation/lecture';
import { UPDATE_STUDENT_NOTES } from '@/garphql/students/mutation/notes';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import {
  addOrUpdateNotesFormSchema,
  addOrUpdateStudentNotesFormSchema,
} from '@/models/add-or-update-notes';
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

  const [updateLectureNotes] = useMutation(ADD_OR_UPDATE_LECTURE_NOTES_MUTATION, {
    onCompleted: () => {
      toast.success('Lecture notes updated successfully');
      refetchLecture();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateLectureNotes = async (data: z.infer<typeof addOrUpdateNotesFormSchema>) => {
    await updateLectureNotes({
      variables: {
        ...data,
      },
    });
  };

  const [saveStudentNotes, { loading: saveNotesLoading }] = useMutation(UPDATE_STUDENT_NOTES, {
    onCompleted: () => {
      toast.success('Notes saved successfully');
      refetchLecture();
    },
    onError: () => {
      toast.error('Failed to save notes');
    },
  });

  const handleSaveStudentNotes = async (
    data: z.infer<typeof addOrUpdateStudentNotesFormSchema>,
  ) => {
    await saveStudentNotes({
      variables: {
        ...data,
      },
    });
  };
  return {
    createLecture,
    createLoading: mutationLoading,
    createError: mutationError,
    handleCreateLecture,
    handleUpdateLectureNotes,
    handleSaveStudentNotes,
    saveNotesLoading,
  };
};
