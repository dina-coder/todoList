import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNewtask } from '../../../../redux/actions/tasksListActions';

type TTasksListParents = {
  id: string;
  text: string | null;
};

type TAddElementProps = {
  tasksList: TTasksList | null;
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export const AddElement = React.memo(({ tasksList, opened, setOpened }: TAddElementProps) => {
  const tasksListParents: TTasksListParents[] = [];
  tasksList && tasksList.forEach(({ id, text, children }) => {
    tasksListParents.push({ id, text });
    children && children.forEach(({ id, text }) => {
      tasksListParents.push({ id, text })
    })
  })
  const handleClose = () => {
    setOpened(false);
  };
  const [parent, setParent] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    setParent('')
    setText('')
  }, [opened])
  const handleClickBtn = () => {
    dispatch(setNewtask(parent, text))
    setOpened(false);
  }
  return (
    <Dialog open={opened} onClose={handleClose}>
      <DialogTitle>Добавить элемент</DialogTitle>
      <DialogContent>
        <FormControl sx={{ marginTop: 1, minWidth: '100%' }} size="small">
          <InputLabel>Родительский Элемент</InputLabel>
          <Select
            value={parent}
            fullWidth
            label="Родительский Элемент"
            onChange={(e) => setParent(e.target.value)}
          >
            {tasksListParents && tasksListParents.map(({ id, text }) => <MenuItem key={id} value={id}>{text}</MenuItem>)}
            <MenuItem value={'-1'}>В корне</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Заголовок"
          fullWidth
          value={text}
          onChange={(e) => { setText(e.target.value) }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" startIcon={<AddBoxOutlinedIcon />} onClick={handleClickBtn}>
          Добавить элемент
        </Button>
      </DialogActions>
    </Dialog>
  );
})