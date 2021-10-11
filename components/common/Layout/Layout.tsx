import { ReactNode } from "react";

interface Props {
  children?: ReactNode[] | ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
