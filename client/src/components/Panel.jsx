import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const apiLink = "/api";

function Panel(props) {
  let pathname = props.location.pathname;

  const newNote = async() => {
    try{
      const data = await axios.post(`${apiLink}/new-note`)
      if (data.status === 200) {
        console.log(data.data);
      } else {
        console.log(data);
      }
    }catch(err){
      console.log(err)
    }

    window.location.href="/";
  };

  let noteId = pathname.slice(6);
  const deleteNote = async () => {
    try{
      const response = await axios.get(`${apiLink}/delete-note/${noteId}`)

      console.log(response);
    }catch(err){
      console.log(err);
    }

    window.location.href='/';
  };

  return (
    <div className="Panel">
      <div className="nameContainer">
        <Link to="/">
          <p className="appName">FerisNotes</p>
        </Link>
      </div>
      <div className="rightContainer">
        <div className="button-right">
          <button className="add-button" onClick={newNote}>
            Dodaj
          </button>
        </div>
        {pathname.includes("/note/") && (
          <>
            <div className="button-right">
              <button className="delete-button" onClick={deleteNote}>
                Usuń
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(Panel);
