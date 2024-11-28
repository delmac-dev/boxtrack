"use client";

import { useGetCollections } from "@/lib/query-hooks";

export default function Home() {
  const { data: collections, isLoading, isError } = useGetCollections();

  console.log({collections});

  return (
    <div className="w-full flex-1 bg-neutral-700">
      <div className="w-56 h-36"></div>
    </div>
  );
}
