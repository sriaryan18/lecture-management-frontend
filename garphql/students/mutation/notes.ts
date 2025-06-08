import { gql } from '@apollo/client';

export const UPDATE_STUDENT_NOTES = gql`
  mutation UpdateStudentNotes(
    $studentId: String!
    $lectureId: String!
    $classroomId: String!
    $notes: String!
  ) {
    updateStudentNotes(
      studentId: $studentId
      lectureId: $lectureId
      classroomId: $classroomId
      notes: $notes
    ) {
      id
      notes
    }
  }
`;
