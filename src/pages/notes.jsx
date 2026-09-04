import { useState } from "react";
import "../styles/notes.css";

function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Machine Learning",
      content:
        "Revise supervised learning, unsupervised learning and regression.",
      date: "September 4, 2026",
    },
    {
      id: 2,
      title: "Computer Networks",
      content:
        "Study OSI model, TCP/IP model and different types of network topology.",
      date: "September 3, 2026",
    },
    {
      id: 3,
      title: "DAA",
      content:
        "Practice dynamic programming and revise time complexity.",
      date: "September 2, 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  function addNote() {
    if (!newNote.title.trim()) {
      return;
    }

    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toLocaleDateString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes([...notes, note]);

    setNewNote({
      title: "",
      content: "",
    });

    setShowModal(false);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-page">
      <header className="notes-header">
        <div>
          <p className="notes-greeting">Keep your ideas organized 📝</p>

          <h1>My Notes</h1>

          <p className="notes-subtitle">
            Save important topics, ideas and study notes in one place.
          </p>
        </div>

        <button
          className="add-note-button"
          onClick={() => setShowModal(true)}
        >
          + Add Note
        </button>
      </header>

      <section className="notes-toolbar">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-notes">
            <h2>No notes found</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <div className="note-card-top">
                <h2>{note.title}</h2>

                <button
                  className="delete-note"
                  onClick={() => deleteNote(note.id)}
                >
                  🗑️
                </button>
              </div>

              <p className="note-content">{note.content}</p>

              <span className="note-date">{note.date}</span>
            </div>
          ))
        )}
      </section>

      {showModal && (
        <div className="note-modal-overlay">
          <div className="note-modal">
            <h2>Add Note</h2>

            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Write your note..."
              value={newNote.content}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  content: e.target.value,
                })
              }
            />

            <div className="note-modal-actions">
              <button
                className="cancel-note"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-note"
                onClick={addNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;