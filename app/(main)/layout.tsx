import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="inset-y-0 md:flex w-[72px] hidden flex-col h-full z-30 fixed">
        <NavigationSidebar></NavigationSidebar>
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
