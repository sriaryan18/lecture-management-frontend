import Auth from "./auth";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b border-gray-700 p-2 rounded-lg sticky top-0 z-50 bg-gray-800 mb-2">
      <Logo />
      <Auth />
    </div>
  );
}
