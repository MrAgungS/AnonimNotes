import { Notebook } from "lucide-react";
import Link from "next/link";

export default function NotesNotFound(){
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <Notebook className="size-10 text-primary"/>
            </div>
            <h3 className="text-2xl font-bold">No notes</h3>
            <p className=" text-base-content/70">
                Ready to Organize your thought? Create your first note to get started on your journey.
            </p>
            <Link href={"/create"} className="btn btn-primary">
                Create Your Note
            </Link>
        </div>
    )
}