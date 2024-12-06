"use client";

import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

export const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <IoCloseOutline />
      </Link>
    </button>
  );
};
