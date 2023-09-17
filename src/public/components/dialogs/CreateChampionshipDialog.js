import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    TextField, 
    Divider,
    Button,
    Stepper,
    Step,
    StepLabel,
    Box,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { useState } from "react";
import { getApiUrl, getData, postData } from "../../../api/commons";
import { getToken } from "../../../utils/access";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const CreateChampionshipDialog = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    // STEPS
    const steps = [
        "Basic information",
        "Add drivers",
        "Create teams"
    ];
    const [step, setStep] = useState(0);

    // STEP 0
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [adminIsDriver, setAdminIsDriver] = useState(false);

    // STEP 1
    const [newInvitationCode, setNewInvitationCode] = useState("");
    const [invitationCodes, setInvitationCodes] = useState([]);

    // STEP 2
    const [newTeam, setNewTeam] = useState("");
    const [teams, setTeams] = useState([]);

    // NEXT BUTTON
    const enable_next = () => {
        switch (step){
            case 0:
                return name !== "" && description !== "";
            case 1:
                return true;
            case 2:
                return true;
        }
        return false;
    }

    const handleNext = () => {
        switch (step){
            case 0:
                setStep(1);
                break;
            case 1:
                setStep(2);
                break;
            case 2:
                handleCreateChampionship();
                break;
        }
    }

    const handleBack = () => {
        setStep((prev) => prev - 1);
    }

    const buttonText = () => {
        switch (step){
            case 0:
                return "Next";
            case 1:
                return invitationCodes.length > 0 ? "Next" : "Omit";
            case 2: 
                return "Create";
        }
    }

    // Check if invitation is correct (exists)
    const checkInvitation = async (invitation_code) => {
        try {
            let url = getApiUrl() + "/invitations/" + invitation_code + "/exist";
            const exists_res = await getData(url, true, getToken());
            return exists_res.data;

        } catch (e){
            enqueueSnackbar("Error checking if valid Driver Invitation Code", {variant: "error"});
            return false;
        }
    }

    // Create championship
    const handleCreateChampionship = async () => {
        try {
            let url_create = getApiUrl() + "/organizations/" + params.id_league + "/championships";
            let data = {
                name: name,
                description: description,
                adminIsDriver: adminIsDriver,
                invitationCodes: invitationCodes,
                teams: teams
            };
            console.log("DATA TO SEND: ", data);
    
            let create_res = await postData(url_create, data, true, getToken());

            if (create_res && create_res.data && create_res.data.status && create_res.data.status == "Success"){
                enqueueSnackbar("League created successfully!", {variant: "success"});
            }else{
                enqueueSnackbar("Error creating the league. Please, try again.", {variant: "error"});
            }

        } catch(e){
            enqueueSnackbar("Error creating the league. Please, try again.", {variant: "error"});
        }


        // let create_result = await postData(url_create, {
        //     name: name,
        //     description: description,
        //     id_organization: params.id_league
        // }, true, getToken());
        // if (create_result && create_result.data && create_result.data.created){
        //     enqueueSnackbar("League created successfully!", {variant: 'success'});
        //     handleClose();
        // } else {
        //     enqueueSnackbar("Error creating league", {variant: 'error'});
        // }º
    }

    const handleClose = () => {
        // clean step
        setStep(0);

        // clean step 0
        setName("");
        setDescription("");
        setAdminIsDriver(false);
        // clean step 1
        setNewInvitationCode("");
        setInvitationCodes([]);

        // close
        props.onClose();
    }
    
    return (
        <Dialog 
            open={props.open} 
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle>Create Championship</DialogTitle>
            <DialogContent sx={{height: 600}}>
                
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {step == 0 && (
                    <Box>
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
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            label="Description"
                            type="text"
                            required
                            fullWidth
                            variant="standard"
                        />

                        <Divider sx={{mt: 2}}/>

                        <p>
                            Even though you are a league administrator, you have the right to participate and race in it. We want everyone to have fun!
                            Do you dare to race?
                        </p>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={adminIsDriver}
                                    onChange={(e) => {
                                        setAdminIsDriver(e.target.checked);
                                    }}
                                />
                            }
                            label="Run as driver"
                        />


                    </Box>
                )}

                {step == 1 && (
                    <Box>
                        <Grid container>
                            <Grid item sm={8}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="admin_driver"
                                    value={newInvitationCode}
                                    onChange={(e) => {
                                        setNewInvitationCode(e.target.value);
                                    }}
                                    label="Driver Invitation Code (DIC)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <Button
                                    disabled={newInvitationCode.trim().length != 12}
                                    onClick={async () => {
                                        if (invitationCodes.includes(newInvitationCode)){
                                            enqueueSnackbar("You have already added this Driver Invitation Code.", {variant: "error"})
                                        } else {
                                            const valid_invitation_code = await checkInvitation(newInvitationCode);
                                            if (!valid_invitation_code){
                                                enqueueSnackbar("Invitation code not found. Make sure the driver has signed up and the invitation code is written correctly.", {variant: "error"})
                                            } else {
                                                setInvitationCodes([...invitationCodes, newInvitationCode]);
                                                setNewInvitationCode("");
                                            }
                                        }
                                        
                                    }}
                                >
                                    Add Driver
                                </Button>
                            </Grid>
                        </Grid>
                        <List sx={{maxHeight: 200}}>
                            {invitationCodes.map((invitation, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar/>
                                    </ListItemAvatar>
                                    <ListItemText primary={invitation}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => {
                                                const new_invitations = [...invitationCodes];
                                                new_invitations.splice(index, 1);
                                                setInvitationCodes(new_invitations);
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {step == 2 && (
                    <Box>
                        <p>
                            In this final step, you will create the teams.
                            You only have to write their name. You will later manage the team drivers in the team profile page
                        </p>

                        <Grid container alignItems="center">
                            <Grid item sm={8}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="team"
                                    value={newTeam}
                                    onChange={(e) => {
                                        setNewTeam(e.target.value);
                                    }}
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <Button
                                    fullWidth
                                    disabled={newTeam.trim().length == 0}
                                    onClick={async () => {
                                        if (teams.includes(newTeam)){
                                            enqueueSnackbar("You have already added this team.", {variant: "error"})
                                        } else {
                                            setTeams([...teams, newTeam]);
                                            setNewTeam("");
                                        }                                        
                                    }}
                                >
                                    Create Team
                                </Button>
                            </Grid>
                        </Grid>
                        <List sx={{maxHeight: 200}}>
                            {teams.map((team, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Diversity3Icon/>
                                    </ListItemAvatar>
                                    <ListItemText primary={team}/>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            onClick={() => {
                                                const new_teams = [...teams];
                                                new_teams.splice(index, 1);
                                                setTeams(new_teams);
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={step == 0} onClick={handleBack}>Back</Button>
                <Button 
                disabled={!enable_next()} 
                onClick={handleNext}>
                    {buttonText()}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateChampionshipDialog;