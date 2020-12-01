import React from 'react';
import './dashboard.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import logo from '../assets/future.jpg'

const firebase = require('firebase');

class DashboardComponent extends React.Component {

  // State contains the selected note index, the selected note, the notes list and the user email
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      email: null
    }
  }

  render() {

    // Displays all the relevant components to the user, primarily the sidebar and the text editor
    return(

      <div className = "app-container">
        <SidebarComponent
          selectedNoteIndex = {this.state.selectedNoteIndex}
          notes = {this.state.notes}
          deleteNote = {this.deleteNote}
          selectNote = {this.selectNote}
          newNote = {this.newNote}>
        </SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent
            selectedNote = {this.state.selectedNote}
            selectedNoteIndex = {this.state.selectedNoteIndex}
            notes = {this.state.notes}
            noteUpdate = {this.noteUpdate}>
          </EditorComponent> :
          null
        }
        <div style = {{backgroundImage: `url(${logo})`, backgroundSize: "cover", height: "100vh"}}></div>
      </div>
    );
  }

  // Creates an array of notes, referenced by id, to keep track of the specific user's notes
  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr) {
        this.props.history.push('/login');
      }
      else {
        firebase
          .firestore()
          .collection('notes')
          .where('email', '==', _usr.email)
          .onSnapshot(serverUpdate => {
            const notes = serverUpdate.docs.map(_doc => {
              const data = _doc.data();
              data['id'] = _doc.id;
              return data;
            });
            this.setState({
              email: _usr.email,
              notes: notes
            })
            console.log(this.state);
          });
      }
    });

  }

  // Selecting a note
  selectNote = (note, index) => this.setState({selectNoteIndex: index, selectedNote: note});

  // Updating a note
  noteUpdate = (id, noteObject) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObject.title,
        category: noteObject.category,
        body: noteObject.body,
        email: noteObject.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  // Creating a new note
  newNote = async (title, category) => {
    const note = {
      title: title,
      category: category,
      body: '',
      email: this.state.email
    };
    const newFromDatabase = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        category: note.category,
        body: note.body,
        email: note.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDatabase.id;
    await this.setState({note: [...this.state.notes, note]});
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

  // Deleting an existing note
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)});
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({selectedNoteIndex: null, selectedNote: null});
    }
    else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({selectedNoteIndex: null, selectedNote: null});
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }

}

export default DashboardComponent;
