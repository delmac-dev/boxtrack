import { getCollections } from "@/lib/actions";

export default async function Home() {
  const data = await getCollections();

  return (
    <>
      The Home Page
    </>
  );
}
