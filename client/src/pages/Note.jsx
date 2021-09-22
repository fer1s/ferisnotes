import React from 'react'
import axios from 'axios'

import '../assets/css/note.css';

const apiLink = "/api";

function Note(props) {

    const [title, setTitle] = React.useState("Tytuł notatki...");
    const [body, setBody] = React.useState("Zawartość notatki...");

    let pathname = props.location.pathname;
    let noteId = pathname.slice(6);

    React.useEffect(() => {
        let noteID = props.location.pathname.slice(6);
        getNote();
    
        async function getNote() {
            let response = await axios.get(`${apiLink}/get-note?id=${noteID}`);
        
            if(response.status === 200) {
                response = response.data;
                console.log(response);

                setTitle(response.noteTitle);
                setBody(response.noteBody);
            }else{
                window.location.href="/";
            }
        }
    }, []);

    const saveNote = () => {
        console.log(title)
        console.log(body)

        axios({
            method: 'post',
            data: {
                title: title,
                content: body,
                noteID: noteId
            },
            withCredentials: true,
            url: `${apiLink}/save-note`
        }).then(res => {
            console.log(res);
        })
    }

    return (
        <div>
            <div className="noteContent">
                <div className="note">
                    <div className="noteTitleContainer">
                        <input type="text" name="noteTitle" className="noteTitle" placeholder="Wpisz tytuł..." value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="noteBodyContainer">
                        <textarea name="noteBody" spellcheck="false" className="noteBody" value={body} onChange={e => setBody(e.target.value)} placeholder="Wpisz zawartość notatki..."></textarea>
                    </div>
                    <button className="save-btn" onClick={saveNote} >Zapisz</button>
                </div>
            </div>
        </div>
    )
}

export default Note
