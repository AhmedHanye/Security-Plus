import Footer from "@/components/footer";
import Home from "@/components/home/home";

// TODO: add version change mechanism
// TODO Complete the download button
// TODO: optimize the app

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Home />
        {children}
      </main>
      <Footer />
    </>
  );
}
