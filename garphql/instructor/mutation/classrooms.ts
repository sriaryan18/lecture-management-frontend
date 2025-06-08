import { gql } from '@apollo/client';


export const CREATE_CLASSROOM_MUTATION = gql`
  mutation CreateClassroom(
    $description: String!
    $classroomName: String!
    $instructorIds: [String!]!
  ) {
    createClassroom(
      description: $description
      classroomName: $classroomName
      instructorIds: $instructorIds
    ) {
      id
      description
      classroomName
      instructorIds
      lectures
      clientType
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