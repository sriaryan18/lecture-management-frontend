import { gql } from '@apollo/client';

export const JOIN_CLASSROOM_BY_CODE = gql`
  mutation joinClassroomByCode($classroomCode: String!, $studentId: String!, $organizationId: String!) {
    joinClassroomByCode(classroomCode: $classroomCode, studentId: $studentId, organizationId: $organizationId) {
      id
      studentIds
      description
      lectures
      clientType
      instructorIds
      organizationId
      classroomCode
    }
  }
`;
