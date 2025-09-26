import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import loginImage from "../../../../public/login.png";

export default function SignInPage() {
  return (
    <div className="flex justify-between">
      <div className="absolute text-2xl font-bold p-4">Moneymap</div>
      <div className="flex flex-col justify-center items-center md:w-1/2 md:h-screen">
        <LoginForm />
      </div>
      <div className="w-1/2 hidden md:block md:relative h-screen">
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
