"use client";
import { useState } from "react";
import Image from "next/image";
import SignUpForm from "@/components/Forms/Signup";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  return (
    <div className="flex min-h-[98vh] m-2">
      <div className="basis-1/2">
        <Image
          src="/login-page-wallpaper.jpeg"
          alt="Login"
          width={800}
          height={800}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center basis-1/2 p-10 gap-12">
        <HeaderSection isSignUpMode={isSignUpMode} onToggle={setIsSignUpMode} />
        <SignUpForm isSignUp={isSignUpMode} />
      </div>
    </div>
  );
}

/** Header Section Component */
function HeaderSection({
  isSignUpMode,
  onToggle,
}: {
  isSignUpMode: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <div className="space-y-8 ">
      <h1 className="text-4xl font-bold">
        {isSignUpMode ? "Create an account" : "Sign in to your account"}
      </h1>
      <AuthToggle isSignUpMode={isSignUpMode} onToggle={onToggle} />
    </div>
  );
}

/** Toggle Between Sign Up & Sign In */
function AuthToggle({
  isSignUpMode,
  onToggle,
}: {
  isSignUpMode: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <p className="text-sm ml-2">
      {isSignUpMode ? "Already have an account?" : "Don't have an account?"}{" "}
      <Button
        className="text-purple-400 p-0"
        variant="link"
        onClick={() => onToggle(!isSignUpMode)}
      >
        {isSignUpMode ? "Sign in" : "Sign up"}
      </Button>
    </p>
  );
}
