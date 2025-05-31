import { gql } from "@apollo/client";

export const GET_ALL_LECTURES = gql`
  query GetAllLectures($studentId: String!) {
    getClassroomsByStudentIds(studentId: $studentId) {
      id
      clientType
      description
      instructorIds
      lectures
      studentIds
    }
  }
`;

// Helper to get variables object
export const getAllLecturesVariables = (studentId: string) => ({ studentId });
