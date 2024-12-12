import { client } from "@/sanity/lib/client";
import { auth } from "../../../../../auth";
import {
  AUTHOR_BY_ID_QUERY,
  STARTUPS_BY_AUTHOR_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StartupCardSkeleton, UserStartups } from "@/components";
import { Suspense } from "react";

export const experimental_ppr = true;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  const userStartups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  if (!user) return notFound();

  return (
    <section className="profile_container">
      <div className="profile_card">
        <div className="profile_title">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h3>
        </div>
        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="profile_image"
        />
      </div>
      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        <p className="text-30-bold">
          {session?.user?.id === id ? "Your" : "All"} Startups
        </p>
        <ul className="card_grid-sm">
          <Suspense fallback={<StartupCardSkeleton/>}>
            <UserStartups startups={userStartups} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
}


