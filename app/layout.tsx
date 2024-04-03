import type { Metadata } from "next";
import "./globals.css";
import NavigationSideBar from "@/components/navigation/navigation-sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NavigationTopbar from "@/components/navigation/navigation-topbar";


export const metadata: Metadata = {
  title: "Datacom AI tool",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="Datacom AI Tool">
        <body className='block bg-slate-50 dark:bg-slate-800'>

          <NavigationTopbar />

          <div className="flex flex-col">
            <div className="h-[calc(100vh-100px)] w-64 fixed"> {/*  TODO: remove Calc()*/}
              <NavigationSideBar />
            </div>
            <main className="pl-64 h-full ">
              {children}
            </main>
          </div>

        </body>
      </ThemeProvider>
    </html >
  );
}
