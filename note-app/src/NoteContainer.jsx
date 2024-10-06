const NoteContainer=(props)=>{

    
    return (<div className="note-container">
    {
    props.note.map((item)=>{
  
      return (<section className="Note" key={item.id}>
        {!item.edit? <section className="editDelete">
                  <p className="Note-Text">{item.Text}</p>
                  <button onClick={()=>props.editNote(item.id)}>edit</button>
                  <button onClick={()=>props.deleteNote(item.id)}>delete</button>
                  </section>
              :
        <section className="editedNote">
        <input type="text" onChange={props.setEditText} placeholder="change note text"/>
        <button onClick={()=>props.saveNote(item.id)}>save</button>
        <button onClick={()=>props.dontSaveNote(item.id)}>don&apos;t save</button>
        </section>
    }
      </section>)
  
    })
    }
  </div>)
  }
  
  export default NoteContainer
  