"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "../../auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";

export const createStartup = async (form: FormData, pitch: string) => {
  try {
    const session = await auth();
    if (!session) {
      return parseServerActionResponse({
        error: "You must be logged in to create a startup",
        status: "ERROR",
      });
    }

    const { title, description, category, link } = Object.fromEntries(
      Array.from(form).filter(([key]) => key !== "pitch")
    );
    const slug = slugify(title as string, { lower: true, strict: true });
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      pitch,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
