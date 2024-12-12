import { Startup } from "@/interfaces";
import { StartupCard } from "./StartupCard";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  startups: Startup[];
}

export const UserStartups = ({ startups }: Props) => {
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup) => (
          <StartupCard key={startup._id} startup={startup} />
        ))
      ) : (
        <p className="text-20-medium">No startups found</p>
      )}
    </>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};
