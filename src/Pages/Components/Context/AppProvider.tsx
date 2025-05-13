import React, { ReactNode } from "react";
import { Darkmode } from "./Darkmode";
import { Words } from "./words";
import { Language } from "./Language";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <>
      <Words>
        <Language>
          <Darkmode>{children}</Darkmode>
        </Language>
      </Words>
    </>
  );
};

export default AppProviders;
