import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { close as closeModal } from '../reducers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

const ErrorModal = ({ message }) => {
  const isOpen = useSelector((state) => {
    return state.modal.isOpen
  });

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <Button onClick={() => dispatch(closeModal())}>Ok</Button>
        </Box>
      </Modal>
    </div>
  );
}
export default ErrorModal;
