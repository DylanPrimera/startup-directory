import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../../auth";
import { IoLogOutOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export const NavBar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <span className="antialiased font-bold text-gray-700 font-work-sans">
            ST Directory
          </span>
        </Link>
        <div className="flex items-center gap-5 text-gray-700">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <FiPlusSquare
                  className="size-6 sm:hidden"
                  title="Create a startup"
                />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <IoLogOutOutline
                    className="size-6 sm:hidden text-red-500"
                    title="Logout"
                  />
                </button>
              </form>
              <Link href={`/user/${session?.user.id}`}>
                <Avatar className="size-10" title={session?.user?.name??''}>
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button type="submit">Signin with Google</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
