"use client";
import { useQuery } from "@apollo/client";
import { GET_ALL_LECTURES } from "@/queries/students/get-all-lectures";
import { useEffect } from "react";

export default function Home() {
  const {data} = useQuery(GET_ALL_LECTURES, {
    variables: {
      studentId: "abcd",
    },
        
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
