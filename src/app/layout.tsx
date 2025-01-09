
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
  showHomeButton = false,
}: {
  children: React.ReactNode;
  showHomeButton?: boolean;
}) {
  return (
    <html lang="en">
      <body className="layout-page-container">
        <div className="layout-page-background"></div>
        <div className="layout-page-content">
          <Header showHomeButton={showHomeButton} />
          <main className="layout-main-container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
