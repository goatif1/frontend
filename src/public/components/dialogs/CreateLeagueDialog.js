import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import { getApiUrl, postData } from "../../../api/commons";
import { getToken } from "../../../utils/access";


const CreateLeagueDialog = (props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    let enableCreate = name != "" && description != "";

    const handleClose = () => {
        props.onClose();
    }

    const handleCreateLeague = async () => {
        // todo
        console.log("NAME: ", name);
        console.log("DESCRIPTION: ", description);

        let url_create = getApiUrl() + "/organizations/";
        let create_result = await postData(url_create, {
            address: "invented",
            name: name,
            description: description
        }, true, getToken()); // todo: get address
        handleClose();
    }
    
    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Create League</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create your own League to compete against your friends.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    label="Name"
                    type="text"
                    required
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="description"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    label="Description"
                    type="text"
                    required
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!enableCreate} onClick={handleCreateLeague}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateLeagueDialog;