import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';
import DashboardComponent from '../../dashboard/dashboard';

const firebase = require('firebase');

class SidebarComponent extends React.Component {

  // State contains a variable for sorting, a boolean for adding a note, the note title and the note category
  constructor() {
    super();
    this.state = {
      sorted: 0,
      addingNote: false,
      title: null,
      category: null
    };
  }

  render() {

    const {notes, classes, selectedNoteIndex} = this.props;

    // Sidebar contains buttons for creating a new note, sorting and signing out,
    // but also acts as a container to hold each of the notes themselves, found in
    // sidebaritem.js
    if(notes) {
      return(
        <div className = {classes.sidebarContainer}>
          <Button onClick = {this.signOut} className = {classes.newNoteBtn}> Sign Out! </Button>
          <Button onClick = {this.sort} className = {classes.newNoteBtn}> Sort Notes </Button>
          <Button onClick = {this.newNoteBtnClick} className = {classes.newNoteBtn}>
              {this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {
            this.state.addingNote ?
            <div>
              <input
                type = 'text'
                className = {classes.newNoteInput}
                placeholder = 'Enter note title'
                onKeyUp = {(e) => this.updateTitle(e.target.value)}>
              </input>
              <input
                type = 'text'
                className = {classes.newNoteInput}
                placeholder = 'Enter note category'
                onKeyUp = {(e) => this.updateCategory(e.target.value)}>
              </input>
              <Button
                className = {classes.newNoteSubmitBtn}
                onClick = {this.newNote}>
                Submit Note
              </Button>
            </div> :
            null
          }
          <List>
          {
            notes.map((_note, _index) => {
              return(
                <div key = {_index}>
                  <SidebarItemComponent
                    _note = {_note}
                    _index = {_index}
                    selectedNoteIndex = {selectedNoteIndex}
                    selectNote = {this.selectNote}
                    deleteNote = {this.deleteNote}>
                  </SidebarItemComponent>
                  <Divider></Divider>
                </div>
              )
            })
          }
          </List>
        </div>
      );
    }
    else {
      return(<div></div>);
    }
  }

  // If the user clicks the signout button, they will be signed out via the database
  signOut = () => firebase.auth().signOut();

  // Toggle for changing the new note button text, changing the displayed text on the button to cancel, or vice versa
  newNoteBtnClick = () => {
    this.setState({title: null, addingNote: !this.state.addingNote});
  }

  // Updates the title and stores it in the current state
  updateTitle = (txt) => {
    this.setState({title: txt});
  }

  // Updates the category and stores it in the current state
  updateCategory = (txt) => {
    this.setState({category: txt})
  }

  // Creates a new note by title and category, calling on newNote found in dashboard.js
  newNote = (title, category) => {
    this.props.newNote(this.state.title, this.state.category);
    this.setState({title: null, addingNote: false});
  }

  // Sort notes
  // FIX: Does not work
  sort = () => {
    // Unsorted, sort alphabetically from A-Z
    if (this.state.sorted === 0) {
      firebase
        .firestore()
        .collection('notes')
        .orderBy('title')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach(_doc => {
            const data = _doc.data();
            data['id'] = _doc.id;
            return data;
          })
        })
      this.setState({sorted: 1});
    }
    // Sort alphabetically from Z-A
    else if (this.state.sorted === 1) {
      this.setState({sorted: 2});
    }
    // Sort by earliest to latest date modified
    else if (this.state.sorted === 2) {
      this.setState({sorted: 3});
    }
    // Sort by latest to earliest date modified
    else if (this.state.sorted === 3) {
      this.setState({sorted: 4});
    }
    // Returrn to unsorted
    else {
      this.setState({sorted: 0});
    }
  }

  // Selects a note based on the note and index
  selectNote = (n, i) => this.props.selectNote(n, i);

  // deletes a note based on the specific note properties
  deleteNote = (note) => this.props.deleteNote(note);

}

export default withStyles(styles)(SidebarComponent);
