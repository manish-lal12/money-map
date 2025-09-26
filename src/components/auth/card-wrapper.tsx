"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  auth?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  auth,
}: CardWrapperProps) => {
  return (
    <Card
      className={
        auth ? "border-none shadow-none px-6 w-[580px]" : "w-[420px] shadow-md"
      }
    >
      <CardHeader>
        <h1 className="text-2xl font-bold">{headerTitle}</h1>
        <p>{headerLabel}</p>

        {/* <Header label="" {...(auth ? { auth } : {})} /> */}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
