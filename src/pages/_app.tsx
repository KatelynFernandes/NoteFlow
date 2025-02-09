import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header"; // Ensure it's at the top
import "../styles/ProfilePage.css";
import "../styles/index.css";
import "../styles/Events.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderPages = ["/Login", "/Signup"]; // Pages without header

  return (
    <UserProvider>
      {!noHeaderPages.includes(router.pathname) && <Header />} {/* Conditionally render Header */}
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;