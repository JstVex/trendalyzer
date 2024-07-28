import About from "@/components/home/about";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Footer from "@/components/nav/footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Features />
      <Footer />
    </div>
  );
}
