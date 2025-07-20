import { gql } from '@apollo/client';

export const CREATE_LECTURE_MUTATION = gql`
  mutation CreateLecture(
    $instructorId: String!
    $classroomId: String!
    $topics: [String!]!
    $notes: String
    $testIds: [String]
    $lectureName: String!
    $lectureDescription: String!
  ) {
    createLecture(
      instructorId: $instructorId
      classroomId: $classroomId
      topics: $topics
      notes: $notes
      testIds: $testIds
      lectureName: $lectureName
      lectureDescription: $lectureDescription
    ) {
      id
      classroomId
    }
  }
`;

export const ADD_OR_UPDATE_LECTURE_NOTES_MUTATION = gql`
  mutation addOrUpdateNotes(
    $lectureId: String!
    $classroomId: String!
    $instructorId: String!
    $notes: String!
  ) {
    addOrUpdateNotes(
      lectureId: $lectureId
      classroomId: $classroomId
      instructorId: $instructorId
      notes: $notes
    ) {
      id
    }
  }
`;
