import Link from "next/link";

export default function NotFound() {
    return (
      <div className="max-w-screen-xl mx-auto flex flex-col p-4">
        <Link href="/projects">Back to Projects</Link>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the project that you are looking for does not exist.</p>
      </div>
    );
}