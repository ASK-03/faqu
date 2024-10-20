import BlurPage from "@/components/global/blur-page";
import Sidebar from "@/components/sidebar/index";
import Navigation from "@/components/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    userId: string;
  };
};

const layout = ({ children, params }: Props) => {
  return (
    <div className="h-screen overflow-hidden">
        <Navigation isHero={false} />
        <div className="relative">
          <BlurPage>
            <div className="mb-12">{children}</div>
          </BlurPage>
        </div>
    </div>
  );
};

export default layout;
