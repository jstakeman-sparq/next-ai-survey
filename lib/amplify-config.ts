"use client";
import { Amplify } from "aws-amplify";
import config from "@/amplify_outputs.json";

// Configure Amplify only once
if (typeof window !== "undefined") {
  Amplify.configure(config, {
    ssr: true
  });
}

export { Amplify };