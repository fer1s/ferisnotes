import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "../assets/css/home.css";

const apiLink = "/api";

export default function Home() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getNotes();

    async function getNotes() {
      const response = await axios.get(`${apiLink}/notes`);

      console.log(response.data)
      setNotes(response.data);
    }
  }, []);

  return (
    <div className="homeContent">
      <div className="noteListTitle">
        <h1>Lista notatek</h1>
      </div>
      <div className="noteList">
        {notes && (
          <div className="notes">
            {notes.map((note, index) => (
              <Link to={"/note/" + note._id} key={index}>
                <div key={index} className="noteCard">
                  <h5 className="noteTitle">{note.noteTitle}</h5>
                  <p className="noteDesc">{note.noteBody.substring(0, 200)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
