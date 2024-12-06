import { Post } from "@/interfaces";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "../ui/button";

interface Props {
  post: Post;
}

export const StartupCard = ({ post }: Props) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(post.createdAt)}</p>
        <div className="flex gap-1.5">
          <IoEyeOutline size={23} className="text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author.id}`} title="Go to author details">
            <p className="text-16-medium line-clamp-1">{post.author.name}</p>
          </Link>
          <Link href={`/startup/${post.id}`} title="Go to startup details">
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author.id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="avatar author"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${post.id}`} title="Go to startup details">
        <p className="startup-card_desc">{post.description}</p>
        <img
          src={post.image}
          alt="post image"
          className="startup-card_img"
        ></img>
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link
          href={`/?query=${post.category.toLocaleLowerCase()}`}
          title="Show posts by this category"
        >
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button
          className="startup-card_btn"
          asChild
          title="Go to startup details"
        >
          <Link href={`/startup/${post.id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};
