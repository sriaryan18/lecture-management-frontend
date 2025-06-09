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
