import Footer from "@/components/footer";
import Home from "@/components/home/home";
import ReleaseLoading from "@/components/release/releaseLoading";
import Releases from "@/components/release/releases";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Home />
        <Suspense fallback={<ReleaseLoading />}>
          <Releases>{children}</Releases>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
