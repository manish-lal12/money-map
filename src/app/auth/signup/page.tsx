import Image from "next/image";

import { SignupForm } from "@/components/auth/signup-form";
import signUpImage from "../../../../public/signup.jpg";

export default function SignupPage() {
  return (
    <div className="flex justify-between">
      <div className="absolute text-2xl font-bold p-4">Moneymap</div>
      <div className="flex flex-col justify-center items-center w-1/2 h-screen">
        <SignupForm />
      </div>
      <div className="w-1/2 relative h-screen">
        <Image
          src={signUpImage}
          alt="login-image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
