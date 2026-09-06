import { useEffect, useState } from "react";
import "../styles/notes.css";

function Notes() {

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
  getNotes();
  }, []);

  async function getNotes() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const formattedNotes = data.map((note) => ({
        ...note,
        id: note._id,
      }));

      setNotes(formattedNotes);

    } catch (error) {
      console.log(error);
      alert("Failed to load notes");
    }
  }

  async function addNote() {
    if (!newNote.title.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          date: new Date().toLocaleDateString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const note = {
        ...data.note,
        id: data.note._id,
      };

      setNotes([...notes, note]);

      setNewNote({
        title: "",
        content: "",
      });

      setShowModal(false);

    } catch (error) {
      console.log(error);
      alert("Failed to add note");
    }
  }

  function openEditModal(note) {
    setEditingNote({ ...note });
    setShowEditModal(true);
  }

  async function updateNote() {
    if (!editingNote.title.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/notes/${editingNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingNote.title,
            content: editingNote.content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const updatedNote = {
        ...data.note,
        id: data.note._id,
      };

      setNotes(
        notes.map((note) =>
          note.id === editingNote.id ? updatedNote : note
        )
      );

      setShowEditModal(false);
      setEditingNote(null);

    } catch (error) {
      console.log(error);
      alert("Failed to update note");
    }
  }

  async function deleteNote(id) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/notes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setNotes(
        notes.filter((note) => note.id !== id)
      );

    } catch (error) {
      console.log(error);
      alert("Failed to delete note");
    }
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
                className="edit-note"
                onClick={() => openEditModal(note)}>
                  
                  ✏️
                </button>

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

      {showEditModal && editingNote && (
        <div className="note-modal-overlay">
          <div className="note-modal">
            <h2>Edit Note</h2>

            <input
              type="text"
              placeholder="Note title"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Write your note..."
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({
                  ...editingNote,
                  content: e.target.value,
                })
              }
            />

            <div className="note-modal-actions">
              <button
                className="cancel-note"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingNote(null);
                }}
              >
                Cancel
              </button>

              <button
                className="save-note"
                onClick={updateNote}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;