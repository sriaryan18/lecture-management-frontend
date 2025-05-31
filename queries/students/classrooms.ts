import { gql } from "@apollo/client";

export const GET_CLASSROOMS = gql`
  query GetClassrooms($classroomId: String!) {
    getClassroom(classroomId: $classroomId) {
      id
      clientType
      description
      instructorIds
      lectures
      studentIds
    }
  }
`;

export const getClassroomsVariables = (classroomId: string) => ({ classroomId });