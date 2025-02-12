import { PropsWithChildren } from "react";
import CoverPage from "./partials/CoverPage";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto max-[1028px] mt-3">
      <div className="min-h-screen">
        {/* main contain */}
        <div className="flex justify-center">
          <div>
            {/* cover page */}
            <CoverPage />
            {/* cover page */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
