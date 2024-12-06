import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../../auth";

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
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user.name}</span>
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
