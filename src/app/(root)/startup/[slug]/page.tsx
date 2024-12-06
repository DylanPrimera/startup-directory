import { Post } from "@/interfaces";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { View } from "@/components";

export const experimental_ppr = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function StartupDetailPage({ params }: Props) {
  const { slug } = await params;
  const post: Post = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug });

  if (!post) return notFound();

  const parsedContent = markdownit().render(post.pitch || "");
  return (
    <>
      <section className="heading_container !min-h-[230px]">
        <span className="tag">{formatDate(post?._createdAt)}</span>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post?.image}
          alt="Thumnail"
          className="w-full h-auto rounded-xl"
          width={1400}
          height={100}
        ></Image>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="Author avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
              <article>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">Author</p>
              </article>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedContent && (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            ></article>
          )}
        </div>
        <hr className="divider"/>
        {/* TODO: EDITOR SELECTED STARTUPS */}
        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
           <View slug={slug} />
        </Suspense>
      </section>
    </>
  );
}
