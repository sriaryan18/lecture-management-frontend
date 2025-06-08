import { gql } from '@apollo/client';

export const joinClassroomMutation = gql`
  mutation joinClassroom($inviteLink: String!, $studentId: String!) {
    joinClassroom(inviteLink: $inviteLink, studentId: $studentId) {
      id
      studentIds
      description
      lectures
      clientType
      instructorIds
    }
  }
`;
