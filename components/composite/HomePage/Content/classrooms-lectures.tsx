'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { GET_ALL_CLASSROOMS_BY_STUDENT_ID } from '@/garphql/queries/students/classrooms';
import { useAuth } from '@/hooks/store/useAuth';
import { useQuery } from '@apollo/client';
import { getAllClassroomsVariables } from '@/garphql/queries/students/classrooms';
import { useMemo } from 'react';
import Link from 'next/link';

export default function ClassroomsLectures({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { data } = useQuery(GET_ALL_CLASSROOMS_BY_STUDENT_ID, {
    variables: getAllClassroomsVariables(user?.username ?? ''),
  });

  const classRoomsAndLectures = useMemo(() => {
    return data?.getClassroomsByStudentIds.map((classroom: any, index: number) => ({
      id: classroom.id,
      title: classroom.title ?? `Class ${index + 1}`,
      description: classroom.description,
      lectures: classroom.lectures.flatMap((lecture: string, index: number) => ({
        label: `Lecture ${index + 1}`,
        id: lecture,
      })),
    }));
  }, [data]);

  const MenuItem = ({ item }: { item: any }) => (
    <div className="flex flex-row justify-between items-center">
      <p>{item.title}</p>
      <p className="text-sm text-gray-500">({item.description})</p>
    </div>
  );

  const MenuItemSub = ({ item }: { item: any }) => {
    return (
      <SidebarMenuSubItem key={item}>
        <SidebarMenuSubButton asChild isActive={true}>
          <p className="text-sm text-gray-500 text-ellipsis text-nowrap hover:bg-gray-400 hover:cursor-pointer">
            {item.label}
          </p>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };
  return (
    <>
      {classRoomsAndLectures?.length > 0 && (
        <Sidebar {...props} className="bg-green-500 top-14 left-0 w-64">
          <SidebarContent>
            <SidebarGroup className="mt-2 font-bold">
              <SidebarMenu>
                {classRoomsAndLectures.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <MenuItem item={item} />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.lectures.map((lecture, index) => (
                        <Link key={index} href={`/home/classroom/${item.id}/lecture/${lecture.id}`}>
                          <MenuItemSub key={index} item={lecture} />
                        </Link>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
      )}
    </>
  );
}
