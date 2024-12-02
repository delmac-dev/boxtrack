import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BoxTrack | Login",
    description: "Login to use the app",
};

export default function Layout({children}: {children: React.ReactNode;}) {
    return (
      <>
        {children}
      </>
    );
  }