import { gql } from '@apollo/client';

export const GET_ALL_CLASSROOMS_BY_STUDENT_ID = gql`
  query GetClassroomsByStudentIds($studentId: String!) {
    getClassroomsByStudentIds(studentId: $studentId) {
      id
      studentIds
      description
      lectures
      clientType
      instructorIds
      classroomName
      inviteLink
      inviteLinkExpiry
      organizationId
      classroomCode
    }
  }
`;

// Helper to get variables object
export const getAllClassroomsVariables = (studentId: string) => ({ studentId });
