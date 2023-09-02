import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout(props: Props) {
  const { children } = props;
  return <div className="flex h-screen w-full">{children}</div>;
}
