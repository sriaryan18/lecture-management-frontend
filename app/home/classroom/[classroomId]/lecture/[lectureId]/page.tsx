'use client';
import { useParams } from 'next/navigation';
import Lecture from '@/components/composite/HomePage/Content/lecture';
import { useAuth } from '@/hooks/store/useAuth';
import { ApolloError } from '@apollo/client';

import { useLectureQuery } from '@/hooks/lecture/useLectureQuery';
import { useCallback, useMemo, useState } from 'react';
import { useLectureMutation } from '@/hooks/lecture/useLectureMutation';

export default function LecturePage() {
  const { lectureId, classroomId } = useParams();
  const { role, user } = useAuth();

  const [showStudentNotes, setShowStudentNotes] = useState<boolean>(false);
  const {
    lecture: lectureData,
    loading: lectureLoading,
    error: lectureError,
    studentNotes,
    refetchLecture,
  } = useLectureQuery(lectureId as string, classroomId as string, false);

  const { handleUpdateLectureNotes, handleSaveStudentNotes } = useLectureMutation(refetchLecture);

  const switchToMyNotes = useCallback(() => {
    if (role === 'STUDENT') {
      setShowStudentNotes(() => !showStudentNotes);
    }
  }, [role, showStudentNotes]);

  const notesToShow = useMemo(() => {
    if (role === 'TEACHER' || !showStudentNotes) {
      return lectureData?.notes;
    } else if (role === 'STUDENT' && showStudentNotes) {
      return studentNotes ?? '';
    }
  }, [lectureData?.notes, role, showStudentNotes, studentNotes]);

  const isNotesEditable = useMemo(() => {
    return role === 'TEACHER' || (role === 'STUDENT' && showStudentNotes);
  }, [role, showStudentNotes]);

  const saveNotes = (notes: string) => {
    if (role === 'TEACHER') {
      handleUpdateLectureNotes({
        lectureId: lectureId as string,
        classroomId: classroomId as string,
        instructorId: user?.id as string,
        notes,
      });
    } else if (role === 'STUDENT') {
      handleSaveStudentNotes({
        lectureId: lectureId as string,
        classroomId: classroomId as string,
        studentId: user?.id as string,
        notes,
      });
    }
  };

  return (
    <>
      <Lecture
        customerType={role}
        lectureData={lectureData}
        lectureLoading={lectureLoading}
        lectureError={lectureError as ApolloError}
        notesToShow={notesToShow}
        switchToMyNotes={role === 'STUDENT' ? switchToMyNotes : undefined}
        isNotesEditable={isNotesEditable}
        saveNotes={saveNotes}
      />
    </>
  );
}
