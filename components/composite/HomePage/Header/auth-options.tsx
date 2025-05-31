import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function AuthOptions({
  logout,
}: Readonly<{ logout: () => void }>) {
  return (
    <div className="w-full ">
      <Button variant="ghost" className="w-full">
        <User />
        Profile
      </Button>
      <Button variant="ghost" className="w-full" onClick={logout}>
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
