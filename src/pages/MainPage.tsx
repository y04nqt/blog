import { Outlet, useLocation } from "react-router-dom";
import BlogNav from "../components/BlogNav";
import LilFooter from "../components/LilFooter";

export default function MainPage() {
  const location = useLocation();
  return (
    <>
      <BlogNav />
      <Outlet key={location.pathname}/>
      <LilFooter />
    </>
  );
}
