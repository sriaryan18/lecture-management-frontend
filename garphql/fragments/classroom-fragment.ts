import { gql } from '@apollo/client';

export const CLASSROOM_FRAGMENT = gql`
  fragment ClassroomFragment on Classroom {
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
  }
`;
