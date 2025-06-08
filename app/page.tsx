'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import SignUpForm from '@/components/Forms/Signup';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/store/useAuth';
import { toast } from 'sonner';

export type AuthPayload = {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
};

export default function Register() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const router = useRouter();
  const { setAuthInfo } = useAuth();
  const endpoint = useMemo(() => {
    if (isSignUpMode) {
      return '/auth/api/v1/signup';
    }
    return '/auth/api/v1/login';
  }, [isSignUpMode]);

  const {
    mutate,
    isPending,
    error,
    data: response,
  } = useMutation({
    mutationFn: async (payload: AuthPayload) => {
      const { data } = await axiosClient.post(endpoint, payload);
      return data;
    },
  });

  const handleClick = (data: AuthPayload) => {
    mutate(data);
  };

  useEffect(() => {
    if (response && !error) {
      console.log(response);
      setAuthInfo(response.user , response.accessToken, response.refreshToken);

      router.push('/home', { scroll: false });
    }
    if (error) {
      toast.error(error.message, {
        description: error.message,
        duration: 3000,
      });
    }
  }, [response, error, toast]);

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
          <HeaderSection isSignUpMode={isSignUpMode} onToggle={setIsSignUpMode} />
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
        {isSignUpMode ? 'Create an account' : 'Sign in to your account'}
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
      {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
      <Button
        className="text-purple-400 p-0"
        variant="link"
        onClick={() => onToggle(!isSignUpMode)}
      >
        {isSignUpMode ? 'Sign in' : 'Sign up'}
      </Button>
    </p>
  );
}
