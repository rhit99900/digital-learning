import { DeployButton } from "@/components/deploy-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import GeneratePage from "@/components/generate-page";
import LessonListings from "@/components/list-lessons";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">              
              {/* <div className="flex items-center gap-2">
                <DeployButton />
              </div> */}
            </div>
            {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
          </div>
        </nav>
        <GeneratePage />
        <LessonListings />
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">          
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
