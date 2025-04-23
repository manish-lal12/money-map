"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-8">
      <div className="flex items-center justify-between w-full py-2">
        <hr className="w-full border-t border-gray-200" />
        <span className="px-3 text-sm text-gray-500">Or</span>
        <hr className="w-full border-t border-gray-200" />
      </div>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="flex-1 cursor-pointer"
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <FcGoogle size={24} />
        </Button>
        <Button
          size="lg"
          className="flex-1 cursor-pointer"
          variant="outline"
          onClick={() => signIn("github")}
        >
          <FaGithub size={24} />
        </Button>
      </div>
    </div>
  );
};
