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
      <Sidebar id={params.userId} />
      <div className="md:pl-[300px]">
        <Navigation isHero={false} />
        <div className="relative">
          <BlurPage>
            <div className="mb-12">{children}</div>
          </BlurPage>
        </div>
      </div>
    </div>
  );
};

export default layout;
