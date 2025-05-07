import Link from "next/link";
import React, { use } from "react";

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

type Props = {};

const page = (props: Props) => {
  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache",
    });
    const data: Post[] = await res.json();
    return data;
  };

  const data = use(fetchData());

  return (
    <div>
      <h1>Test Page</h1>
      <div className="flex flex-col gap-2 p-5">
        {data.slice(0, 10).map((post) => (
          <div key={post.id} className="border p-2 rounded-md shadow-md">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <Link href={`/test/${post.id}`} className="text-blue-500 underline">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
