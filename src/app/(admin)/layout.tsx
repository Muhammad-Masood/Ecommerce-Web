import { Navbar } from "./_components/Navbar";
import "@/app/globals.css";
import { fetchLogo } from "../data";
import { ClerkProvider } from "@clerk/nextjs";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logo }: any = await fetchLogo();
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className="my-[2rem] space-y-[5rem]"
        suppressHydrationWarning={true}
      >
        <Navbar logo={logo} key={logo.asset.url} />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
