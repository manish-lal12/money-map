"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect" | "popup";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  const onClick = () => {};

  if (mode === "modal") {
    return <div>To implement</div>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

// remove this
