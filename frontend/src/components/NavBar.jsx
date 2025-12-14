import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function NavBar() {
  return (
    <header className="border-b border-base-content/10 bg-base-300">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-2xl font-semibold tracking-tighter">
            Anonim Notes
          </h1>
          <Link
            href="/create"
            className="btn btn-primary flex items-center gap-2"
          >
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
