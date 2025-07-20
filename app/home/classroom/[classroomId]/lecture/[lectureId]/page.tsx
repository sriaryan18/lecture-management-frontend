'use client';
import { useParams } from 'next/navigation';
import Lecture from '@/components/composite/HomePage/Content/lecture';
import { useAuth } from '@/hooks/store/useAuth';
import { ApolloError } from '@apollo/client';

import { useLectureQuery } from '@/hooks/lecture/useLectureQuery';

export default function LecturePage() {
  const { lectureId, classroomId } = useParams();
  const { role } = useAuth();

  const {
    lecture: lectureData,
    loading: lectureLoading,
    error: lectureError,
    studentNotes,
  } = useLectureQuery(lectureId as string, classroomId as string, false);

  return (
    <>
      <Lecture
        customerType={role}
        lectureData={lectureData}
        lectureLoading={lectureLoading}
        lectureError={lectureError as ApolloError}
        studentNotes={studentNotes?.data}
      />
    </>
  );
}
