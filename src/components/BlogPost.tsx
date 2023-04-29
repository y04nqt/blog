import { useLoaderData } from "react-router-dom";
import CenteredWrapper from "./CenteredWrapper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


const BlogPost = () => {
    //@ts-ignore
    const { blog } = useLoaderData();
    return (
        <CenteredWrapper>
            <div className="flex max-h-[calc(100%-61px)] bg-white rounded-xl shadow-xl">
                <section className="flex flex-col p-10 overflow-y-auto text-left">
                    <h1 className="m-0">{blog.title}</h1>
                    <small>{blog.author}</small>
                    <ReactMarkdown>{blog.body}</ReactMarkdown>
                </section>
            </div>
        </CenteredWrapper>
    )
}

export default BlogPost;