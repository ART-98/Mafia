import React, { use } from "react";
// import { Metadata } from "next/types";

type Props = {
  params: {
    id: string;
  };
};

// // export async function generateMetadata({ params }: Props): Promise<Metadata> {
// //   // read route params
// //   const { id } = params;

// //   // fetch data
// //   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
// //     cache: "force-cache",
// //   });

// //   const product = await res.json();

// //   return {
// //     title: product.title,
// //     description: product.body,
// //   };
// // }

const page = async ({ params: { id } }: Props) => {
  const fetchData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        cache: "force-cache",
      }
    );
    const data = await res.json();
    return data;
  };
  const data = await fetchData();

  return (
    <div>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="mt-2">{data.body}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Comments</h2>
        {/* Comments will be displayed here */}
      </div>
    </div>
  );
};

export default page;

// // app/test/[id]/page.tsx
// // export async function generateStaticParams() {
// //   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// //   const posts = await res.json();

// //   return posts.slice(0, 10).map((post: any) => ({
// //     id: post.id.toString(),
// //   }));
// // }
