import { Params, defer } from "react-router-dom";


const BlogLoader = async (params: Params<string>) => {
    const {id} = params;

    const fetcher = async () => {
        const data = await fetch(`https://raw.githubusercontent.com/y04nqt/portfolio-data/main/blogs/${id}.json`)
        const body = await data.json();
        return body;
    }
    return defer({ blog: fetcher() });
}

export default BlogLoader;