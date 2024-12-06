import { SearchForm, StartupCard } from "@/components";

interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { query } = await searchParams;
  const posts = [
    {
      id: 1,
      title: "We Robots",
      description: "This is the first post",
      views: 55,
      author: { id: 1, name: "John Doe" },
      createdAt: new Date(),
      updatedAt: new Date(),
      category: "Robots",
      image:
        "https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=294&auto=format&fit=crop&ixlib=rb-4.03&ixid=M3wxMjA3fDB8MHxwaG9by1wYWdlfHx8fGVufDB8fHx8fA%3D3D",
    },
  ];

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
            posts.map((post) => <StartupCard key={post.id} post={post}/>)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
