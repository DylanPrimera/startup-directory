"use server";

import { auth } from "../../auth";
import { parseServerActionResponse } from "./utils";

export const createIdea = async (state: any, form: FormData, pitch: string) => {
  try {
    const session = await auth();
    if (!session) {
      return parseServerActionResponse({
        ...state,
        error: "You must be logged in to create a startup",
        status: "ERROR",
      });
    }
    
  } catch (error) {}
};
