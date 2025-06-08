import { gql } from '@apollo/client';

export const GET_LECTURE_BY_ID = gql`
  query GetLectureById($lectureId: String!) {
    getLectureById(id: $lectureId) {
      id
      topics
      createdAt
      notes
      instructorId
      testIds
      createdAt
    }
  }
`;

// Helper to get variables object
export const getAllLecturesVariables = (lectureId: string) => ({ lectureId });
