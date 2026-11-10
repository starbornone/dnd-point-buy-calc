import { HomeCalculator } from "@/components/HomeCalculator";
import { Navbar } from "@/components/Navbar";
import { SeoContent } from "@/components/SeoContent";

export default function App() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14 print:max-w-none print:p-4">
        <HomeCalculator />
        <SeoContent />
      </main>
      <Navbar />
    </>
  );
}
