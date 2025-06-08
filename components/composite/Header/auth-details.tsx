import { useAuth } from "@/hooks/store/useAuth";

export default function AuthDetails() {
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      <p className="text-sm ">
        Full Name:{" "}
        <span className="font-semibold">
          {user?.firstName} {user?.lastName}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        Email: <span className="font-semibold">{user?.email ?? "N/A"} </span>
      </p>
    </div>
  );
}
