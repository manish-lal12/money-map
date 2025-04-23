import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";
import loginImage from "../../../../public/login.png";

export default function SignInPage() {
  return (
    <div className="flex justify-between">
      <div className="absolute">Moneymap</div>
      <div className="flex flex-col justify-center items-center w-1/2 h-screen">
        <LoginForm />
      </div>
      <div className="w-1/2 relative h-screen">
        <Image
          src={loginImage}
          alt="login-image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
