import { Await, Link, useLoaderData } from "react-router-dom";
import CenteredWrapper from "./CenteredWrapper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkBreaks from "remark-breaks";
import React from "react";

const BlogPost = () => {
    //@ts-ignore
    const { blog } = useLoaderData();
    return (
        <React.Suspense
            fallback={<CenteredWrapper widthCalc="w-[calc(100%-5rem)] sm:w-[calc(100%-330px-5rem)]"><p className="mx-auto text-4xl font-thin animate-pulse">Loading...</p></CenteredWrapper>}
        >
            <Await
                resolve={blog}
                errorElement={<CenteredWrapper><Link to="/"><p className="text-2xl text-red-800">Oh no! An error occured, click here to go back.</p></Link></CenteredWrapper>}
            >
                {(blog) =>(
                    <CenteredWrapper>
                        <div className={`flex max-h-[calc(100%-61px)] bg-white rounded-xl shadow-xl appear-in`}>
                            <section className="flex flex-col p-10 overflow-y-auto text-left">
                                <h1 className="m-0">{blog.title}</h1>
                                <small>{blog.author}</small>
                                <ReactMarkdown
                                    remarkPlugins={[remarkBreaks]}
                                >{blog?.body.replace(/<br>/gi, "&nbsp; \n")}</ReactMarkdown>
                            </section>
                        </div>
                    </CenteredWrapper>
                )}
            </Await>
        </React.Suspense>
    )
}

export default BlogPost;