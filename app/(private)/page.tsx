"use client";

import { useGetCollections } from "@/lib/query-hooks";

export default function Home() {
  const { data: collections, isLoading, isError } = useGetCollections();

  console.log({collections});

  return (
    <>
      The Home Page
    </>
  );
}
