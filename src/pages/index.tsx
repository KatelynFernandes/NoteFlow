import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to My App</h1>

      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <Link href="/ProfilePage">Go to Profile</Link>
          <br />
          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <div>
          <p>Please log in or sign up to continue.</p>
          <a href="/api/auth/login?returnTo=/Homepage">Login</a> |{" "}
          <a href="/api/auth/login?screen_hint=signup&returnTo=/Homepage">Signup</a>

        </div>
      )}
    </div>
  );
}
