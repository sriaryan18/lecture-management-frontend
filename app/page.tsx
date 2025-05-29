"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SignUpForm from "@/components/Forms/Signup";
import { useMutation } from "@tanstack/react-query";
import axiosClient, { getBaseURL } from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import { setAuth } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export type AuthPayload = {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
};

export default function Register() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const { toast } = useToast()
  const dispatch = useDispatch()
  const router = useRouter()
    const endpoint = useMemo(() => {
    if (isSignUpMode) {
      return "/auth/api/v1/signup";
    }
    return "/auth/api/v1/login";
  }, [isSignUpMode]);

  const {
    mutate,
    isPending,
    error,
    data: response,


  } = useMutation({
    mutationFn: async (payload: AuthPayload) => {
      const { data } = await axios.post(endpoint, payload, { withCredentials: true, baseURL: getBaseURL() })
      return data;
    },
  });

  const handleClick = (data: AuthPayload) => {
    mutate(data);

  };

  useEffect(() => {
    if (response && !error) {
      console.log(response);
      dispatch(setAuth({
        user: response.user ?? {},
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }));
      router.push("/home",{ scroll: false,  });
    }
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [response, error, dispatch, toast, router]);

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
          <SignUpForm isSignUp={isSignUpMode} onClick={handleClick} isLoading={isPending} />
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
