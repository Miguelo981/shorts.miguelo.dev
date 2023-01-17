import HomeNavbar from "../components/HomeNavbar"
import HomeHead from "./head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <HomeHead />
        <HomeNavbar />
        <main className="overflow-hidden">{children}</main>
      </>
  )
}
