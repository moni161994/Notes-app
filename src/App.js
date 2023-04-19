import { nanoid } from "nanoid";
import { useState } from "react";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState([]);
  const [cancel, setCancel] = useState(false);

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = [
      {
        id: nanoid(),
        text: note,
      },
      ...notes,
    ];
    setNotes(temp);
    setNote("");
  };

  const handleChange = (id, value) => {
    const editIdText = notes.findIndex((text) => text.id == id);
    const newNotes = [...notes];
    newNotes[editIdText] = { ...newNotes[editIdText], newText: value };
    setNotes(newNotes);
    console.log(id, value);
  };

  const handleDelete = (id) => {
    const finalNotes = notes.filter((note) => note.id !== id);
    setNotes(finalNotes);
  };

  const handleSave = (id) => {
    const editIdText = notes.findIndex((text) => text.id == id);
    const newNotes = [...notes];
    const { newText } = newNotes[editIdText];
    newNotes[editIdText].text = newText;
    delete newNotes[editIdText].newText;
    setNotes(newNotes);
    const newEdit = [...edit];
    newEdit.splice(edit.indexOf(id), 1);
    setEdit(newEdit);
  };

  const handleEdit = (id) => {
    if (!edit.includes(id)) {
      setEdit([...edit, id]);
    }
  };

  const handleCancel = (id) => {
    const editIdText = notes.findIndex((text) => text.id == id);
    const newNotes = [...notes];
    delete newNotes[editIdText].newText;
    setNotes(notes);
    const newEdit = [...edit];
    newEdit.splice(edit.indexOf(id), 1);
    setEdit(newEdit);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Notes App</h1>
      <div style={{ padding: "40px 200px" }}>
        <label style={{ fontSize: "20px", marginBottom: "5px" }}>
          Write your notes here
        </label>
        <form onSubmit={handleSubmit}>
          <textarea
            value={note}
            onChange={handleNote}
            style={{ height: "58px", width: "100%" }}
            className="form-control"
            aria-label="With textarea"
          ></textarea>
          <button
            style={{ padding: "10px 20px" }}
            type="submit"
            className="btn btn-success mt-3"
          >
            Save
          </button>
        </form>
      </div>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{ margin: "0 auto" }}
          className="card w-75 mb-3"
        >
          <div className="card-body">
            {edit.includes(note.id) ? (
              <textarea
                onChange={(e) => handleChange(note.id, e.target.value)}
                value={note.newText || note.text}
                className="form-control mb-3"
                aria-label="With textarea"
              ></textarea>
            ) : (
              <p className="card-text">{note.text}</p>
            )}
            {edit.includes(note.id) ? (
              <button
                // onClick={() => handleSave(note.id)}
                onClick={() => handleCancel(note.id)}
                className="btn btn-danger me-3"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => handleDelete(note.id)}
                className="btn btn-danger me-3"
              >
                Delete
              </button>
            )}

            {edit.includes(note.id) ? (
              <button
                onClick={() => handleSave(note.id)}
                className="btn btn-success"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(note.id)}
                className="btn btn-warning me-3"
              >
                Edit <i class="fa-solid fa-pen-to-square"></i>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
