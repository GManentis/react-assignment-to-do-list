import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

function makeid(length:number = 5) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export default function MyModal({
    toDoList, 
    setToDoList,     
    modalOpen, 
    setModalOpen, 
    toDoInput, 
    setToDoInput,
    setSnackBarMsg,
    setSnackBarOpen} : any) {


  const statuses = [{
    value: "pending",
    label: "Pending"
  },
  {
    value: "completed",
    label: "Completed"
  },
  {
    value: "deleted",
    label: "Deleted"
  }];

 const handleCreateEntry = async (toDoInput: any) => {
    let idForInsert = makeid(7);
    while (toDoList.find((el:any) => el.id === idForInsert)) {
      idForInsert = makeid(7);
    }
    const createdAt = new Date();
    toDoInput = {...toDoInput, id:idForInsert, createdAt, updatedAt: null, deletedAt: toDoInput.status === "deleted" ? new Date() : null};

    await setToDoList([...toDoList, toDoInput]);            
    await setModalOpen(false);

    await setSnackBarMsg("Η εγγραφή προστεθηκε επιτυχώς");
    await setSnackBarOpen(true);
 }

  const handleUpdateEntry = async (toDoInput: any) => {
    const locatedIndex = toDoList.map((e:any) => e.id).indexOf(toDoInput.id);

    const foundToDoEntry = toDoList[locatedIndex];
    foundToDoEntry.title = toDoInput.title;
    foundToDoEntry.status = toDoInput.status;
    foundToDoEntry.description = toDoInput.description;
    foundToDoEntry.updatedAt = new Date();
    foundToDoEntry.deletedAt = toDoInput.status === "deleted" ? new Date() : null;

    await setToDoList([...toDoList]);
    await setModalOpen(false);

    await setSnackBarMsg("Η εγγραφή ενημερώθηκε επιτυχώς");
    await setSnackBarOpen(true);
 }

 const handleEntry = async (toDoInput: any) => {
    if (!toDoInput.id) {
        await handleCreateEntry(toDoInput);
        return;
    }
    await handleUpdateEntry(toDoInput);
 }

  return (
      <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Box sx={{mb:2}}>
         <TextField
         fullWidth
          required
          label="Title"
          value={toDoInput.title ?? null}
          onChange={(e : any) => setToDoInput({...toDoInput, title: e.target.value})}
        />
        </Box>
        <Box sx={{mb:2}}>
        <TextField
          fullWidth
          required
          label="Description"
          onChange={(e : any) => setToDoInput({...toDoInput, description: e.target.value})}
          value={toDoInput.description ?? null}
        />        
        </Box>
        <Box sx={{mb:2}}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status*</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={toDoInput?.status}
          label="Status"
          onChange={(e) => setToDoInput({...toDoInput, status: e.target.value})}
        >
          {statuses.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </Select>
          </FormControl>
        </Box>
        <Button onClick={() => handleEntry(toDoInput)}>SUBMIT</Button>
      </Paper>
    </Modal>
  )
}