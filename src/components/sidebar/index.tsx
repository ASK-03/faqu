import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
};

const Sidebar = ({ id }: Props) => {
  return (
    <>
      <MenuOptions id={id} defaultOpen={true} />
      <MenuOptions id={id} />
    </>
  );
};

export default Sidebar;
