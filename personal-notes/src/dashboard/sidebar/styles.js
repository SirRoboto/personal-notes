const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  newChatBtn: {
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'red',
    position: 'absolute',
    top: '0',
    right: '5px'
  },
  newNoteBtn: {
    width: '100%',
    height: '35px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    backgroundColor: '#7e002f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ffa9c9'
    }
  },
  sidebarContainer: {
    marginTop: '0px',
    width: '300px',
    height: '100%',
    boxSizing: 'border-box',
    color: 'black',
    backgroundColor: '#eeeeee',
    float: 'left',
    overflowY: 'scroll',
    borderRight: '3px solid black',
    borderBottom: '3px solid black',
    overflowX: 'hidden'
  },
  newNoteInput: {
    width: '100%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)'
    }
  },
  newNoteSubmitBtn: {
    width: '100%',
    backgroundColor: '#54001f',
    borderRadius: '0px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#9B0E27'
    }
  }
});

export default styles;
