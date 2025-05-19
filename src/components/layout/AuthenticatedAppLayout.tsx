
import { AppLayout as OriginalAppLayout } from "./AppLayout";
import { UserProfileDisplay } from "../auth/UserProfileDisplay";
import { ReactNode } from "react";

type AuthenticatedAppLayoutProps = {
  children: ReactNode;
};

export function AuthenticatedAppLayout({ children }: AuthenticatedAppLayoutProps) {
  return (
    <OriginalAppLayout>
      {children}
      <UserProfileDisplay />
    </OriginalAppLayout>
  );
}
