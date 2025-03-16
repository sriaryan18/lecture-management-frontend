"use client";
import { BaseInput } from "@/components/BaseComponents/Input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

export default function SignUpForm({
  isSignUp,
  onClick,
}: {
  isSignUp: boolean;
  onClick: (mode: "signup" | "signin") => void;
}) {
  const signUpFormSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    emailOrUsername: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailOrUsername: "",
      password: "cdcd",
    },
  });

  const onSubmit = (data: z.infer<typeof signUpFormSchema>) => {
    console.log("Submitted Data:", data);
    onClick(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isSignUp && (
          <div className="grid grid-cols-2 gap-4">
            <BaseInput
              label="First Name"
              type="text"
              placeholder="First Name"
              {...form.register("firstName")}
              className="h-12 w-full"
            />
            <BaseInput
              label="Last Name"
              type="text"
              placeholder="Last Name"
              {...form.register("lastName")}
              className="h-12 w-full"
            />
          </div>
        )}

        <BaseInput
          label="Email Or Username"
          type="email"
          placeholder="Email Or Username"
          {...form.register("emailOrUsername")}
          className="w-full h-12"
        />
        <BaseInput
          label="Password"
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className="w-full h-12"
        />

        <Button
          type="submit"
          className="w-full h-12 font-semibold text-md rounded-xl"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
