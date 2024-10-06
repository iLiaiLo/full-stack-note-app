const Header =(props)=>{
    return (
    <nav className="header">
    <input type="text" onChange={props.setNoteText} placeholder="add new note" />
    <button onClick={props.addNote} >add</button>
    </nav>)
  }
  
  export default Header
  