import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AppHead from "./head";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHead />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
