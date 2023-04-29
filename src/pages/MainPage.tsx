import { Outlet } from "react-router-dom";
import BlogNav from "../components/BlogNav";
import LilFooter from "../components/LilFooter";

export default function MainPage() {
  return (
    <>
      <BlogNav />
      <Outlet/>
      <LilFooter />
    </>
  );
}
