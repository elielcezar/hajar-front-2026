

import PostContent from "./post-content";
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

type PostPageProps = {
  // In this experimental version, params might be a promise.
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  // Await params in case it's a promise
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }
  
  return <PostContent post={post} />;
}
