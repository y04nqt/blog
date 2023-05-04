import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import BlogNav from "../components/BlogNav";
import LilFooter from "../components/LilFooter";
import { useState } from "react";

export default function MainPage() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <BlogNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Outlet context={[{isMenuOpen, setIsMenuOpen}]} key={location.pathname}/>
      <LilFooter />
    </>
  );
}

export function useIsMenuOpen() {
  console.log(useOutletContext())
  return useOutletContext<{isMenuOpen: boolean}>();
}
