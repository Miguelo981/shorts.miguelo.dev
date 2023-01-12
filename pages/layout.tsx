import HomeNavbar from "../components/HomeNavbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <HomeNavbar />
        <main className="overflow-hidden">{children}</main>
      </>
  )
}
