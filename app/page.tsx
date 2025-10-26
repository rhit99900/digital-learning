import { ThemeSwitcher } from "@/components/theme-switcher";
import GeneratePage from "@/components/generate-page";
import LessonListings from "@/components/list-lessons";
import { TITLE } from "@/lib/config";
import StoreProvider from "@/components/providers/store-provider";

export default function Home() {  

  return (
    <section className="w-full max-w-5xl flex flex-col justify-between items-center p-3 px-5 text-sm">          
      <StoreProvider>
        <GeneratePage />
        <LessonListings />          
      </StoreProvider>
    </section>
  );
}
