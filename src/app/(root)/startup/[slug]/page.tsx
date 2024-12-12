import { Startup } from "@/interfaces";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StartupCard, View } from "@/components";

export const experimental_ppr = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function StartupDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Paralell fetchs
  const [startup, { select: editorStartups }] = await Promise.all([
    client.fetch(STARTUP_BY_SLUG_QUERY, { slug }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  if (!startup) return notFound();

  const parsedContent = markdownit().render(startup.pitch || "");
  return (
    <>
      <section className="heading_container !min-h-[230px]">
        <span className="tag">{formatDate(startup?._createdAt)}</span>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={startup?.image}
          alt="Thumnail"
          className="w-full h-auto rounded-xl"
          width={1400}
          height={100}
        ></Image>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author.image}
                alt="Author avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
              <article>
                <p className="text-20-medium">{startup.author.name}</p>
                <p className="text-16-medium !text-black-300">Author</p>
              </article>
            </Link>
            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedContent && (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            ></article>
          )}
        </div>
        <hr className="divider" />
        {editorStartups?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorStartups.map((startup: Startup) => (
                <StartupCard key={startup._id} startup={startup} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View slug={slug} id={startup._id} />
        </Suspense>
      </section>
    </>
  );
}
