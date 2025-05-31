import { Button } from "@/components/ui/button";
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
} from "@/components/ui/sidebar";

export default function ClassroomsLectures({
  classRoomsAndLectures,
  ...props
}: React.ComponentProps<typeof Sidebar> & { classRoomsAndLectures: any }) {
  const data = {
    navMain: [
      {
        title: "Class 1",
        url: "#",
        items: [
          {
            title: "Lecture 1",
            url: "test",
          },
          {
            title: "Lecture 2",
            url: "#",
          },
        ],
      },
    ],
  };
  console.log(classRoomsAndLectures);

  const MenuItem = ({ item }: { item: any }) => (
    <div className="flex flex-row justify-between items-center">
      <p>{item.title}</p>
      <p className="text-sm text-gray-500">({item.description})</p>
    </div>
  );

  const MenuItemSub = ({ item }: { item: any }) => {
    console.log(item)
    return  <SidebarMenuSubItem key={Math.random()}>
    <SidebarMenuSubButton asChild isActive={true}>
      <p className="text-sm text-gray-500 text-ellipsis text-nowrap hover:bg-gray-400 hover:cursor-pointer">{item}</p>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
  }

  return (
    <Sidebar {...props} className="bg-green-500  top-14 left-0 w-64">
      <SidebarContent>
        <SidebarGroup className="mt-2 font-bold">
          <SidebarMenu>
      
            {classRoomsAndLectures.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <MenuItem item={item} />
                </SidebarMenuButton>
                <SidebarMenuSub >
                  {item.lectures.map((lecture) => (
                    <MenuItemSub key={Math.random()} item={lecture.id} />
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
