"use client";
import { useQuery } from "@apollo/client";
import { GET_ALL_LECTURES } from "@/queries/students/get-all-lectures";
import { useEffect, useMemo } from "react";
import Content from "@/components/composite/HomePage/Content";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ClassroomsLectures from "@/components/composite/HomePage/Content/classrooms-lectures";

export default function Home() {
  const { data } = useQuery(GET_ALL_LECTURES, {
    variables: {
      studentId: "cdscds",
    },
  });

  const classRoomsAndLectures = useMemo(() => {
    return data?.getClassroomsByStudentIds.map((classroom,index) => ({
      id: classroom.id,
      title: classroom.title ?? `Class ${index + 1}`,
      description: classroom.description,
      lectures: classroom.lectures.map((lecture) => ({id: lecture})),
    }));
  },[data])

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex ">
      <SidebarProvider>
        {classRoomsAndLectures && <ClassroomsLectures  classRoomsAndLectures={classRoomsAndLectures}/>}
        <SidebarTrigger />

        <div >
          <Content />
        <pre>{JSON.stringify(classRoomsAndLectures, null, 2)}</pre>
        </div>
      </SidebarProvider>
    </div>
  );
}
