import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IItem { link: string; name: string; title: string }

const BlogNav = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');

  const multiFilter = (item:IItem) => {
    let searchFormatted = search.toLowerCase().trim();
    if (item.name.toLowerCase().includes(searchFormatted)
    || item.title.toLowerCase().includes(searchFormatted)
    || item.link.toLowerCase().includes(searchFormatted)) {
      return item;
    }
  }
  
  
  const location = useLocation();
  useEffect(() => {
    const getBlogNav = async () => {
      try {
        const blogItems = await fetch(
          `https://raw.githubusercontent.com/y04nqt/portfolio-data/main/nav-data.json`
        );
        setBlogs(await blogItems.json());
      } catch (err) {
        console.log(err);
      }
    };

    getBlogNav();
  }, []);

  return (
    <nav
      style={{ boxShadow: "4px 4px 16px 4px rgba(100,100,100,0.3)" }}
      className="absolute h-[calc(100%-2.5rem-61px)] w-[250px] bg-white px-10 py-5 my-0 text-left z-20"
    >
      <a
        href="https://y04nqt.github.io/"
        className="text-black no-underline hover:underline"
      >
        🏠 Home
      </a>
      <Link
        className={`text-center block my-4 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300 ${location.pathname.substring(1) === '' ? 'bg-blue-200' : ''}`}
        to="/"
      >
        Welcome!
      </Link>
      <div className="">
        <Input className="w-full" placeholder="Search posts" onChange={(e) => setSearch(e.target.value)}/>
      </div>

      {blogs.length > 0 &&
        blogs.filter((item: IItem) => multiFilter(item)).reverse().map((item: { link: string; name: string; title: string }) => (
          <div
            key={item.name}
          >
            <h4 className="mb-0 font-thin">{item.title}</h4>
            <Link
              className={`block my-4 mt-1 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300 appear-in ${location.pathname.substring(1) === item.link ? 'bg-blue-200' : ''}`}
              to={`/${item.link}`}
            >
              {item?.name}
            </Link>
          </div>
        ))}
    </nav>
  );
};

export default BlogNav;
