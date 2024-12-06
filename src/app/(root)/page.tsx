import { SearchForm, StartupCard } from "@/components";
import { Post } from "@/interfaces";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { query } = await searchParams;
  const posts: Post[] = await client.fetch(STARTUPS_QUERY);

  return (
    <>
      <section className="heading_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepeneur
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions{" "}
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post}/>)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
