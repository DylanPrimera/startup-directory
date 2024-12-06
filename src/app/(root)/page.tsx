import { SearchForm } from "@/components";

interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({searchParams}:Props) {
  const {query} = await searchParams;
  return (
    <>
      <section className="heading_container">
        <h1 className="heading">Pitch Your Startup, <br/> Connect With Entrepeneur</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions </p>
        <SearchForm query={query}/>
      </section>
    </>
  );
}
