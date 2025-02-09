import { useRouter } from "next/router";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import "../styles/ProfilePage.css"; 


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeaderRoutes = ["/Login", "/Signup"]; // Pages without header

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
