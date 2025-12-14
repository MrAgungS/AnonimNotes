'use client';

import api from "@/lib/axiosInstance";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePage({tb_notes}) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router= useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !notes.trim()) {
      toast.error("Title and notes must be filled in.");
      return;
    }

    setLoading(true);
    try {
        await api.post("/notes", {
            title,
            note: notes,
        })
        toast.success("Success crate note");
        router.push("/")
    } catch (error) {
        
        if (error.response.status === 429) {
            toast.error("Slow down!!", {
                duration: 4000,
            })
        } else{
            toast.error("Error to create note", error);
        }
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="btn btn-ghost mb-6">
            <ArrowLeft className="size-5" />
            Back to Homepage
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mr-6">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Notes */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text mr-5">Note</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Action */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
