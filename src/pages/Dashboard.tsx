import { Content } from "./Content";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export const Dashboard = () => {
  return (
    <div className="h-full bg-gray-200 dark:bg-gray-900 flex flex-col gap-1">
      <Header />
      <div className=" flex h-full w-full flex-row">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

