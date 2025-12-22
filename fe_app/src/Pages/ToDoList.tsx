import { useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import MyModal from "../components/MyModal";
import MySnackbar from "../components/MySnackbar";
import '../toDo.css';



export default function ToDoList() { //eslint is a slavedriver. I hated it always 
    const [toDoList, setToDoList] = useState<object[]>([]);
    const [toDoInput, setToDoInput] = useState<any>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [snackBarMsg, setSnackBarMsg] = useState<string | null>(null);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    
    const prepareNewEntry = async () => {
        await setToDoInput({});
        await setModalOpen(true);
    };

    const prepareExistingEntry = async (entry: any) => {
        await setToDoInput({...entry});  
        await setModalOpen(true);
    }

    const handleEntryForDelete = async (id:string) => {
        const locatedEntry = toDoList.find((el:any) => el.id === id) as any;
        if(locatedEntry.deletedAt)
        if(confirm("Είστε σίγουροι οτι θέλετε να προχωρήσετε με τη διαγραφή αυτής της εγγραφής;")) {
            locatedEntry.status = "deleted";
            locatedEntry.deletedAt = new Date();
            await setToDoList([...toDoList]);
            await setSnackBarMsg("Η εγγραφή διαγράφτηκε επιτυχώς");
            await setSnackBarOpen(true);
        }
       

    }

    return (
         <Container>
            <Button onClick={() => prepareNewEntry()}>New entry</Button>
            <MyModal 
                toDoList={toDoList} 
                setToDoList={setToDoList}     
                modalOpen={modalOpen}
                setModalOpen={setModalOpen} 
                toDoInput={toDoInput} 
                setToDoInput={setToDoInput}
                setSnackBarMsg={setSnackBarMsg}
                setSnackBarOpen={setSnackBarOpen}
            />
            <MySnackbar 
                snackBarMsg={snackBarMsg}
                snackBarOpen={snackBarOpen} 
                setSnackBarOpen={setSnackBarOpen}
            />
            {toDoList.map((el:any) => 
            <Paper sx={{width:"100%", m:1, display:"flex", flexDirection:"row"}} className={el.deletedAt ? "linediv" : "none"}>
                <Box sx={{width:"70%", p:4}}>
                    <Typography variant="h6"> 
                        {el.title}
                    </Typography>
                </Box>
                <Box sx={{width:"30%", p:2, display:"flex", verticalAlign:"middle", flexDirection:"row-reverse"}}>
                    <Button disabled={el.deletedAt ? true : false}><DeleteIcon onClick={() => handleEntryForDelete(el.id)}></DeleteIcon></Button>
                    <Button onClick={() => prepareExistingEntry(el)}><EditIcon></EditIcon></Button>
                </Box>  
            </Paper>)
            }
        </Container>);
}