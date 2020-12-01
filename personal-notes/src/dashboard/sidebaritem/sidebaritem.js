import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {

    render() {

      const {_index, _note, classes, selectedNoteIndex} = this.props;

      // Handles display of each note based on their index, displaying a preview
      // consisting of the title and description up to 30 characters
      return(
        <div key = {_index}>
          <ListItem
            className = {classes.listItem}
            selected = {selectedNoteIndex === _index}
            alignItems = 'flex-start'>
            <div
              className = {classes.textSection}
              onClick = {() => this.selectNote(_note, _index)}>
              <ListItemText
                primary = {_note.title}
                secondary = {'[' + _note.category + ']  ' + removeHTMLTags(_note.body.substring(0, 30)) + '...'}>
              </ListItemText>
            </div>
            <DeleteIcon
              onClick = {() => this.deleteNote(_note)}
              className = {classes.deleteIcon}>
            </DeleteIcon>
          </ListItem>
        </div>
      );
    }

    // Selects the note based on the note properties and index
    selectNote = (n, i) => this.props.selectNote(n, i);

    // Deletes note based on specific note properties
    deleteNote = (note) => {
      // `` allows you to write a string but also allow javascript
      if(window.confirm(`Are you sure you want to delete: ${note.title}?`)) {
        this.props.deleteNote(note);
      }
    }

}

export default withStyles(styles)(SidebarItemComponent);
