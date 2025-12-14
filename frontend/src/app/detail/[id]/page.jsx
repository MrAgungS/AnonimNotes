'use client'

import api from "@/lib/axiosInstance";
import { ArrowLeft, Loader2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailNotes() {

    // State to store note data (controlled inputs)
    const [notes, setNotes] = useState({
        title: "",
        note: "",
    });
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const router = useRouter();

    // Get dynamic route parameter (/detail/[id])
    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
        try {
            // Call API to get note by id
            // Because of interceptor, response is already unwrapped
            const data = await api.get(`/notes/${id}`);

            // Set state with fallback to empty string
            // This prevents uncontrolled -> controlled input warning
            setNotes({
                title: data?.title ?? "",
                note: data?.note ?? ""
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch note");
        } finally {
            setLoading(false);
        }
        };

        // Prevent API call if id is undefined
        if (id) fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted");
        router.push("/");
        } catch (error) {
        toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {
        if (!notes.title.trim() || !notes.note.trim()) {
        toast.error("Please add a title or note");
        return;
        }

        setSaving(true);
        try {
        await api.put(`/notes/${id}`, {
            title: notes.title,
            note: notes.note,
        });
        toast.success("Note updated successfully");
        router.push("/");
        } catch (error) {
        toast.error("Failed to update note");
        } finally {
        setSaving(false);
        }
    };

    if (loading) {
        return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <Loader2Icon className="animate-spin size-10" />
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Link href="/" className="btn btn-ghost">
                <ArrowLeft className="h-5 w-5" />
                Back to Notes
                </Link>
                <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
                >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
                </button>
            </div>

            <div className="card bg-base-100">
                <div className="card-body">
                {/* Title */}
                <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Title</span>
                    </label>
                    <input
                    type="text"
                    className="input input-bordered"
                    value={notes.title}
                    onChange={(e) =>
                        setNotes({ ...notes, title: e.target.value })
                    }
                    />
                </div>

                {/* Note */}
                <div className="form-control mb-4">
                    <label className="label">
                    <span className="label-text">Note</span>
                    </label>
                    <textarea
                    className="textarea textarea-bordered h-32"
                    value={notes.note}
                    onChange={(e) =>
                        setNotes({ ...notes, note: e.target.value })
                    }
                    />
                </div>

                <div className="card-actions justify-end">
                    <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                    >
                    {saving ? "Saving..." : "Save Note"}
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
