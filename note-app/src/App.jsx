import {useState,useEffect} from 'react'

import Header from "./header"
import NoteContainer from "./NoteContainer"
import './App.css'

function App() {

 const [noteText,setNoteText]=useState('');
 const [note,setNote]=useState([])
 const [editText,setEditText]=useState('');

 useEffect(()=>{
  fetch('http://localhost:5000/notes')
  .then(res=>res.json())
  .then(data=>setNote(data))
  .catch(e=>console.log(e))
 },[])

function NoteText(e){
  setNoteText(e.target.value)
}

function EditText(e){
  setEditText(e.target.value)
}

async function addNote(){
   const elem={id:Math.random(),Text:noteText,edit:false};
   const NoteArray=[...note,elem]

   try {
    await fetch('http://localhost:5000/notes',{
      method:"POST",
      body:JSON.stringify(elem),
      headers:{
        "content-type":"application/json"
      }
     })
  
     setNote(NoteArray);
   } catch (error) {
    console.log(error)
   }
   

 }



async function deleteNote(id){
   const updatedNote=note.filter(item=>item.id!==id);

   try {
    await fetch(`http://localhost:5000/notes/${id}`,{
      method:"DELETE",
      headers:{
        "Content-type":"application/json"
      }
     })
  
     setNote(updatedNote);

   } catch (error) {
    console.log(error)
   }

  
 }

 async function editNote(id){
   setEditText('');

   let patchData;
   const editNoteArr=note.map((item)=>{
     if(item.id===id){
       patchData={edit:!item.edit}
       return {...item,edit:!item.edit}
     }
     return item
   })

   try {
    await fetch(`http://localhost:5000/notes/${id}`,{
      method:"PATCH",
      body:JSON.stringify(patchData),
      headers:{
        "Content-type":"application/json"
      }
     })
  
     setNote(editNoteArr);
   } catch (error) {
    console.log(error)
   }

 }


 async function saveNote(id){

  let patchData;
  const saveEditNote=note.map((item)=>{
    if(item.id===id){
      patchData={Text:editText,edit:!item.edit}
      return {...item,Text:editText,edit:!item.edit}
    }
    return item
  })

  try {

   await fetch(`http://localhost:5000/notes/${id}`,{
      method:"PATCH",
      body:JSON.stringify(patchData),
      headers:{
        "Content-type":"application/json"
      }
     })
  
    setNote(saveEditNote)
  } catch (error) {
    console.log(error)
  }


 }

 async function dontSaveNote(id){
  let patchData;

   const dontSave=note.map(item=>{
     if(item.id===id){
      patchData={edit:false}
      return {...item,edit:false}
     }
     return item
   })

   try {

    await fetch(`http://localhost:5000/notes/${id}`,{
      method:"PATCH",
      body:JSON.stringify(patchData),
      headers:{
        "Content-type":"application/json"
      }
     })
  
     setNote(dontSave);

   } catch (error) {
    console.log(error)
   }

 }


  return (
    <>
      <Header setNoteText={NoteText} addNote={addNote} />

      <NoteContainer note={note}
      editNote={editNote}
      deleteNote={deleteNote}
      setEditText={EditText}
      saveNote={saveNote}
      dontSaveNote={dontSaveNote} />

    </>
  )
}

export default App
