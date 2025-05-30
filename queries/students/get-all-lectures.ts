import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";

export const GET_ALL_LECTURES = gql`
  query GetAllLectures {
  getClassroomsByStudentIds(studentId: "cdscds") {
    id
    clientType
    description
    instructorIds
    lectures
    studentIds
  }
}
`;

client.query({
  query: GET_ALL_LECTURES,
  variables: {
    studentId: "cdscds",
  },
}).then(res => {
  console.log(res);
})  ;
