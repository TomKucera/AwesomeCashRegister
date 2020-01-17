import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { green, purple, blueGrey, lightGreen,  brown } from '@material-ui/core/colors';

function rand() {
  return Math.round(Math.random() * 20) - 10;
};

function getModalStyle() {
  const top = 50;// 50 + rand();
  const left = 50;//50 + rand();

  
  return {
    top: `${top}%`,
    left: `${left}%`,
    //margin: "auto",
    transform: `translate(-${top}%, -${left}%)`,
  };
};

/*
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const useStyles = makeStyles({
    paper: {
        position: 'absolute',
        width: 400,
        //backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        //boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
      },
});
*/

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

interface iProps {
  open: boolean,
  
};

export type IComponentProps = iProps;

const ModalDialog: React.FC<IComponentProps> = (props: IComponentProps): JSX.Element => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        //onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>

      <button type="button" onClick={handleClose}>
        close Modal
      </button>
        </div>
      </Modal>
    </div>
  );
};

export default  ModalDialog;