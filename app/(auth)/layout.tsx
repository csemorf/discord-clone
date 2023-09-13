const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-white  h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
