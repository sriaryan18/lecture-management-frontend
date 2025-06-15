import { gql } from '@apollo/client';

export const GET_ALL_CLASSROOMS_BY_INSTRUCTOR_ID = gql`
  query GetClassroomsByInstructorId($instructorID: String!) {
    getClassroomsByInstructorId(instructorID: $instructorID) {
      id
      studentIds
      description
      lectures
      clientType
      classroomName
      instructorIds
      inviteLink
      inviteLinkExpiry
      organizationId
      classroomCode
    }
  }
`;

export const GET_CLASSROOM_WITH_STUDENTS_BY_CLASSROOM_ID = gql`
  query GetClassroomById($classroomId: String!) {
    getClassroomById(classroomId: $classroomId) {
      students {
        id
        username
        firstName
        lastName
        email
      }
    }
  }
`;
