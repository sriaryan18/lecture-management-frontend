"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SignUpForm from "@/components/Forms/Signup";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";

export default function Register() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [payload, setPayload] = useState();

  const endpoint = useMemo(() => {
    if (isSignUpMode) {
      return "/auth/api/v1/signup";
    }
    return "/auth/api/v1/signin";
  }, [isSignUpMode]);

  const { request } = useApi({
    endpoint: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "test",
    },
    body: payload,
    lazy: true,
  });

  const handleClick = (_data: unknown) => {
    setPayload(_data);
  };
  useEffect(() => {
    if (payload) {
      request();
    }
  }, [payload, request]);

  return (
    <div className="flex min-h-[98vh] m-2 ">
      <div className="basis-1/2">
        <Image
          src="/login-page-wallpaper.jpeg"
          alt="Login"
          width={800}
          height={800}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center basis-1/2 p-10 gap-12 ">
        <div className="w-1/2">
          <HeaderSection
            isSignUpMode={isSignUpMode}
            onToggle={setIsSignUpMode}
          />
        </div>
        <div className="w-1/2 ">
          <SignUpForm isSignUp={isSignUpMode} onClick={handleClick} />
        </div>
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
    <div className="space-y-4  ">
      <h1 className="text-3xl font-bold">
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
