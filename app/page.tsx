import { ThemeSwitcher } from "@/components/theme-switcher";
import GeneratePage from "@/components/generate-page";
import LessonListings from "@/components/list-lessons";
import { TITLE } from "@/lib/config";
import StoreProvider from "@/components/providers/store-provider";

export default function Home() {  

  return (
    <section className="container md:w-full px-4 py-2 w-full">          
      <StoreProvider>
        <GeneratePage />
        <LessonListings />          
      </StoreProvider>
    </section>
  );
}
