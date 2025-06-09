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

import { useMemo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { HomeIcon } from 'lucide-react';

export default function ClassroomsLectures({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { classroomLectures } = useSelector((state: RootState) => state.classroomLecture);

  const classRoomsAndLectures = useMemo(() => {
    return classroomLectures?.data?.map((classroom: any, index: number) => ({
      id: classroom.id,
      title: classroom.classroomName ?? `Class ${index + 1}`,
      description: classroom.description,
      lectures: classroom.lectures.flatMap((lecture: string, index: number) => ({
        label: `Lecture ${index + 1}`,
        id: lecture,
      })),
    }));
  }, [classroomLectures]);

  const MenuItem = ({ item }: { item: any }) => (
    <div className="flex flex-row justify-between items-center overflow-hidden">
      <p className="text-ellipsis  flex-shrink">{item.title}</p>
      <p className="text-sm text-gray-500">({item.description})</p>
    </div>
  );

  const MenuItemSub = ({ item }: { item: any }) => {
    return (
      <SidebarMenuSubItem key={item}>
        <SidebarMenuSubButton asChild isActive={true}>
          <p className="text-sm text-gray-500 text-ellipsis ">{item.label}</p>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };
  return (
    <Sidebar {...props} className="top-14 left-0 w-64 overflow-y-auto h-full  text-wrap">
      <SidebarContent className="overflow-y-auto">
        <SidebarMenuButton
          asChild
          className="mt-2  bg-white text-center text-black hover:bg-gray-400 hover:cursor-pointer justify-center"
        >
          <Link href="/home">
            <HomeIcon className="w-4 h-4" /> <span className="">Home</span>
          </Link>
        </SidebarMenuButton>

        <SidebarGroup className="mt-2 font-bold h-full overflow-y-auto   ">
          <SidebarMenu>
            {classRoomsAndLectures?.map((classroom) => (
              <SidebarMenuItem key={classroom.id}>
                <SidebarMenuButton asChild className="text-wrap text-ellipsis">
                  <MenuItem item={classroom} />
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {classroom.lectures?.map((lecture, index) => (
                    <Link
                      key={index}
                      href={`/home/classroom/${classroom.id}/lecture/${lecture.id}`}
                    >
                      <MenuItemSub key={index} item={lecture} />
                    </Link>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
