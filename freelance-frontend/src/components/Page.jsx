import { useEffect } from "react";

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} | SkillNet`;
  }, [title]);

  return <>{children}</>;
};

export default Page;
