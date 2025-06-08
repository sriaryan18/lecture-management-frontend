"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/store/useAuth";
import { getInitials } from "@/utils/labels";
import { ChevronDown } from "lucide-react";
import AuthOptions from "./auth-options";
import AuthDetails from "./auth-details";

export default function Auth() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Popover>
      <div className="flex items-center gap-2 mr-2">
        <Avatar>
          <AvatarFallback className="bg-slate-300 text-gray-800 ">
            {getInitials(user.firstName, user.lastName)}
          </AvatarFallback>
        </Avatar>

        <PopoverTrigger>
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent className=" mr-2 p-2 w-fit space-y-2" align="end">
          <AuthDetails />
          <AuthOptions logout={logout} />
        </PopoverContent>
      </div>
    </Popover>
  );
}
