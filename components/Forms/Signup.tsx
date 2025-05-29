"use client";
import { BaseInput } from "@/components/BaseComponents/Input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import type { AuthPayload } from "@/app/page";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function SignUpForm({
  isSignUp,
  onClick,
  isLoading,
}: Readonly<{
  isSignUp: boolean;
  onClick: (data: AuthPayload) => void;
  isLoading: boolean;
}>) {
  const signUpFormSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const signInFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });


  const form = useForm<z.infer<typeof signUpFormSchema | typeof signInFormSchema>>({
    resolver: zodResolver(isSignUp ? signUpFormSchema : signInFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
  });


  const onSubmit = (data: z.infer<typeof signUpFormSchema | typeof signInFormSchema >) => {
    console.log("Submitted Data:", data);
    onClick(data);
  };

  return (
    <Form {...form}>
   
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
        {isSignUp && (
          <div className="grid grid-cols-2 gap-4">
            <BaseInput
              label="First Name"
              type="text"
              placeholder="First Name"
              {...form.register("firstName")}
              className="h-12 w-full"
              error={form.formState.errors.firstName?.message}
            />
      
            <BaseInput
              label="Last Name"
              type="text"
              placeholder="Last Name"
              {...form.register("lastName")}
              className="h-12 w-full"
              error={form.formState.errors.lastName?.message}
            />
          </div>
        )}

        <BaseInput
          label="Username"
          type="text"
          placeholder="Username"
          {...form.register("username")}
          className="w-full h-12"
          error={form.formState.errors.username?.message}
        />
        <BaseInput
          label="Password"
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="w-full h-12"
          error={form.formState.errors.password?.message}
        />

        <Button
          type="submit"
          className="w-full h-12 font-semibold text-md rounded-xl"
          isLoading={isLoading}
        >
          {!isLoading && isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
