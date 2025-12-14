import api from "@/lib/axiosInstance";
import { formatDate } from "@/lib/utils";
import { Edit2Icon, Trash2 } from "lucide-react";
import Link from "next/link"
import toast from "react-hot-toast";

export default function NoteCard({ tb_notes, setNotes }) {

  const handleDelete = async (e,id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(tb_notes => tb_notes.id !== id))
      toast.success("Note deleted Success")
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  return (
    <Link href={`/detail/${tb_notes.id}`} 
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-blue-300"
    >
    <div className="card-body">
      <h3 className=" card-title text-base-content">{tb_notes.title}</h3>
      <p className="text-base-content/70 line-clamp-3">{tb_notes.note}</p>
      
      <div  className="card-actions justify-between items-center mt-4">
        <span className="text-sm text-base-content/60">
          {formatDate(tb_notes.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <Edit2Icon className="size-4"/>
          <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, tb_notes.id)}>
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
    </Link>

  );
}
