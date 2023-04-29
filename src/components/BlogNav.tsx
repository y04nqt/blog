import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogNav = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogNav = async () => {
      try {
        const blogItems = await fetch(
          `https://raw.githubusercontent.com/y04nqt/portfolio-data/main/nav-data.json`
        );
        const data = await blogItems.json();
        setBlogs(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    getBlogNav();
  }, []);
  return (
    <nav
      style={{ boxShadow: "4px 4px 16px 4px rgba(100,100,100,0.3)" }}
      className="absolute h-[calc(100%-2.5rem-61px)] w-[150px] bg-white px-10 py-5 my-0 text-left z-20"
    >
      <a
        href="https://y04nqt.github.io/"
        className="text-black no-underline hover:underline"
      >
        🏠 Home
      </a>
      <Link
        className="text-center block my-4 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300"
        to="/"
      >
        Welcome!
      </Link>
      {blogs.length > 0 &&
        blogs.map((item: { link: string; name: string }) => (
          <Link
            className="block my-4 w-[calc(100%-1rem-3px)] p-2 no-underline border-solid border-1 rounded text-black text-ellipsis hover:shadow-lg transition-all duration-300"
            key={item.name}
            to={`/${item.link}`}
          >
            {item?.name}
          </Link>
        ))}
    </nav>
  );
};

export default BlogNav;
