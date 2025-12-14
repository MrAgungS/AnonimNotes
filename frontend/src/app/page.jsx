"use client";

import { useEffect, useState, useRef } from "react";
import { getNotes } from "@/services/notes.service";
import RateLimitUI from "@/components/RateLimit.jsx";
import NoteCard from "@/components/NoteCard.jsx";
import NotesNotFound from "./create/NotFound";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isRateLimit, setRateLimit] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // useRef is used to prevent the API request from running more than once
  const fetchRef = useRef(false);

  useEffect(() => {

    if (fetchRef.current) return;
    fetchRef.current = true;

    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        
        // must be exactly the same as in the response backend
        // setNotes(res.data.payload.data);
        //if using the new response template
        // setNotes(res.data.data);
        // or you uses lib and services code for unwrap
        setNotes(data);
        setRateLimit(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setRateLimit(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      {isRateLimit && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-6">
        {loading && <p className="text-center">Loading...</p>}

        {notes.length === 0 && !isRateLimit &&<NotesNotFound />}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} tb_notes={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
