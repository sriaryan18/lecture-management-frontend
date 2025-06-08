import { gql } from '@apollo/client';

export const GET_STUDENT_NOTES = gql`
  query GetStudentNotes($studentId: String!, $lectureId: String!, $classroomId: String!) {
    getStudentNotes(studentId: $studentId, lectureId: $lectureId, classroomId: $classroomId) {
      id
      notes
    }
  }
`;
