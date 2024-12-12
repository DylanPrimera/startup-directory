import { Startup } from "@/interfaces";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "../ui/button";

interface Props {
  startup: Startup;
}

export const StartupCard = ({ startup }: Props) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(startup._createdAt)}</p>
        <div className="flex gap-1.5">
          <IoEyeOutline size={23} className="text-primary" />
          <span className="text-16-medium">{startup.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link
            href={`/user/${startup.author?._id}`}
            title="Go to author details"
          >
            <p className="text-16-medium line-clamp-1">
              {startup.author?.name}
            </p>
          </Link>
          <Link
            href={`/startup/${startup.slug?.current}`}
            title="Go to startup details"
          >
            <h3 className="text-26-semibold line-clamp-1">{startup.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${startup.author?._id}`}>
          <Image
            src={startup.author.image}
            alt="avatar author"
            width={48}
            height={48}
            className="rounded-full"
            title={`Go to ${startup.author?.name} page`}
          />
        </Link>
      </div>
      <Link
        href={`/startup/${startup.slug?.current}`}
        title="Go to startup details"
      >
        <p className="startup-card_desc">{startup.description}</p>
        <Image
          src={startup.image}
          alt="post image"
          className="startup-card_img"
        />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link
          href={`/?query=${startup.category.toLocaleLowerCase()}`}
          title="Show posts by this category"
        >
          <p className="text-16-medium">{startup.category}</p>
        </Link>
        <Button
          className="startup-card_btn"
          asChild
          title="Go to startup details"
        >
          <Link href={`/startup/${startup.slug?.current}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
