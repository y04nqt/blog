import { IconButton, Input } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface IItem {
  link: string;
  name: string;
  title: string;
}

const multiFilter = (item: IItem, searchTerm: string) => {
  let searchFormatted = searchTerm.toLowerCase().trim();
  if (
    item.name.toLowerCase().includes(searchFormatted) ||
    item.title.toLowerCase().includes(searchFormatted) ||
    item.link.toLowerCase().includes(searchFormatted)
  ) {
    return item;
  }
};

const BlogNav = ({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: (arg0: boolean) => void;
  isMenuOpen: boolean;
}) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();

  const getBlogNavData = useCallback(async () => {
    const blogNavItems = await fetch(
      `https://raw.githubusercontent.com/y04nqt/portfolio-data/main/nav-data.json`
    );
    setBlogs(await blogNavItems.json());
  }, []);

  useEffect(() => {
    getBlogNavData();
  }, [getBlogNavData]);

  return (
    <nav
      className={`nav-shadow overflow-x-hidden transition-all duration-500 absolute h-[calc(100%-2.5rem-61px)] ${
        isMenuOpen ? "w-[250px] px-10" : "w-[0px] px-0"
      } sm:w-[250px] bg-white py-5 sm:px-10 sm:py-5 my-0 text-left z-20`}
    >
      <div
        className={`fixed sm:hidden top-[10px] transition-all duration-500 ${
          isMenuOpen ? "left-[329px]" : "left-[0px]"
        }`}
      >
        <IconButton className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen && <CloseIcon />}
          {!isMenuOpen && <MenuIcon />}
        </IconButton>
      </div>
      <div
        className={`${
          isMenuOpen ? "block min-w-[250px]" : "hidden opacity-0"
        } transition-all duration-1000 sm:opacity-100   sm:block`}
      >
        <a
          href="https://y04nqt.github.io/"
          className="text-black no-underline hover:underline"
        >
          🏠 Home
        </a>
        <Link
          className={`text-center block my-4 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300 shadow ${
            location.pathname.substring(1) === "" ? "bg-blue-200" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
          to="/"
        >
          Welcome!
        </Link>
        <div className="">
          <Input
            className="w-full"
            placeholder="Search posts"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {blogs.length > 0 &&
          blogs
            .filter((item: IItem) => multiFilter(item, search))
            .reverse()
            .map((item: { link: string; name: string; title: string }) => (
              <div key={item.name}>
                <h4 className="mb-0 font-thin">{item.title}</h4>
                <Link
                  className={`block my-4 mt-1 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300 appear-in shadow ${
                    location.pathname.substring(1) === item.link
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  to={`/${item.link}`}
                >
                  {item?.name}
                </Link>
              </div>
            ))}
      </div>
    </nav>
  );
};

export default BlogNav;
