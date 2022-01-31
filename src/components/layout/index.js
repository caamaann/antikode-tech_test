import Navbar from "../navbar";

const Layout = ({ children }) => {
  return (
    <div className="tw-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
