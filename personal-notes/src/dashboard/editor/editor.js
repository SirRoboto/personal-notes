import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {

  // State contains all of the relevant fields for any given note stored in the database
  constructor() {
    super();
    this.state = {
      title: '',
      category: '',
      body: '',
      email: '',
      id: ''
    }
  }

  // When component or note mounts, it sets the state of each method from the default
  componentDidMount = () => {
    this.setState({
      title: this.props.selectedNote.title,
      category: this.props.selectedNote.category,
      body: this.props.selectedNote.body,
      email: this.props.selectedNote.email,
      id: this.props.selectedNote.id
    });
  }
  // When a new note is selected, it is instead mounted
  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        title: this.props.selectedNote.title,
        category: this.props.selectedNote.category,
        body: this.props.selectedNote.body,
        email: this.props.selectedNote.email,
        id: this.props.selectedNote.id
      });
    }
  }

  render() {

    const {classes} = this.props;

    // Allows user to modify the title, category and body of a specific note
    return(
      <div className = {classes.editorContainer}>
        <BorderColorIcon className = {classes.editIcon}></BorderColorIcon>
        <input
          className = {classes.titleInput}
          placeholder = 'Note title...'
          value = {this.state.title ? this.state.title : ''}
          onChange = {(e) => this.updateTitle(e.target.value)}>
        </input>
        <input
          className = {classes.categoryInput}
          placeholder = 'Category title...'
          value = {this.state.category ? this.state.category : ''}
          onChange = {(e) => this.updateCategory(e.target.value)}>
        </input>
        <ReactQuill style = {{backgroundColor: 'white', borderBottom: '3px solid black'}}
          value = {this.state.body}
          onChange = {this.updateBody}>
        </ReactQuill>
      </div>
    );
  }

  // Updates note in database when the title is modified
  updateTitle = async (txt) => {
    await this.setState({title: txt});
    this.update();
  }

  // Updates note in database when the category is modified
  updateCategory = async (txt) => {
    await this.setState({category: txt});
    this.update();
  }

  // Asynchronously updates the body of the text
  updateBody = async (val) => {
    await this.setState({body: val});
    this.update();
  };

  // In order to avoid overloading the database with HTTP requests, we wait for
  // the user to stop typing over a time interval and be more efficent via debouncing.
  // 1500 is in milliseconds = 1.5 seconds
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      category: this.state.category,
      body: this.state.body,
      email: this.state.email
    })
  }, 1500);

}

export default withStyles(styles)(EditorComponent);
