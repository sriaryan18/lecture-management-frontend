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
