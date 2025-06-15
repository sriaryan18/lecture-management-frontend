import { gql } from '@apollo/client';

export const CREATE_CLASSROOM_MUTATION = gql`
  mutation CreateClassroom(
    $description: String!
    $classroomName: String!
    $instructorIds: [String!]!
    $organizationId: String!
  ) {
    createClassroom(
      description: $description
      classroomName: $classroomName
      instructorIds: $instructorIds
      organizationId: $organizationId
    ) {
      id
      description
      classroomName
      instructorIds
      lectures
      clientType
      organizationId
    }
  }
`;

export const CREATE_INVITE_LINK_MUTATION = gql`
  mutation createInviteLink($classroomId: String!, $expiry: String!) {
    createInviteLink(classroomId: $classroomId, expiry: $expiry) {
      link
      expiry
    }
  }
`;

export const ADD_STUDENTS_IN_CLASSROOM_MUTATION = gql`
  mutation AddStudentsInClassroom($studentIds: [String!]!, $classroomId: String!) {
    addStudentsInClassRoom(studentIds: $studentIds, classroomId: $classroomId) {
      id
      description
      lectures
      clientType
      classroomName
      instructorIds
      inviteLink
      inviteLinkExpiry
      organizationId
      classroomCode
      studentIds
    }
  }
`;
