import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import LatestBlog from "@/components/LatestBlog";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Problems />
      <LatestBlog />
    </div>
  );
}



