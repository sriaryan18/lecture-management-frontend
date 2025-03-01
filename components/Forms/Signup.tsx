import { BaseInput } from "@/components/BaseComponents/Input";
import { Button } from "@/components/ui/button";

export default function SignUpForm({ ...props }: { isSignUp: boolean }) {
  const MyStyledBaseInput = ({ ...props }) => (
    <BaseInput {...props} className="h-12 " />
  );
  return (
    <div className=" space-y-6 w-2/3">
      {props.isSignUp ? (
        <div className="grid grid-cols-2 gap-4">
          <MyStyledBaseInput
            label="First Name"
            type="text"
            placeholder="First Name"
          />
          <MyStyledBaseInput
            label="Last Name"
            type="text"
            placeholder="Last Name"
          />
        </div>
      ) : null}

      <MyStyledBaseInput label="Email" type="email" placeholder="Email" />
      <MyStyledBaseInput
        label="Password"
        type="password"
        placeholder="Password"
      />
      {props.isSignUp ? (
        <Button className="w-full h-12 font-semibold text-md rounded-xl ">
          Sign Up
        </Button>
      ) : (
        <Button className="w-full h-12 font-semibold text-md rounded-xl ">
          Sign In
        </Button>
      )}
    </div>
  );
}
