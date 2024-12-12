import { SearchForm, StartupCard } from "@/components";
import { Startup } from "@/interfaces";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";


interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: Props) {
 
 const { query } = await searchParams;
  const params = { search: query || null };
  const { data: startups } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

 


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
          {startups?.length > 0 ? (
            startups.map((post: Startup) => (
              <StartupCard key={post._id} startup={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
