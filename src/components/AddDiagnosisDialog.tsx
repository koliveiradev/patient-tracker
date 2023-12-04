import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button, Autocomplete } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { usePatientService } from "../services/Patient";
import { Diagnosis, Illness } from "../models/Diagnosis";
import { Medication } from "../models/Medication";

export function AddDiagnosisDialog() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [illnesses, setIllnesses] = React.useState<Illness[]>([]);
    const [medications, setMedications] = React.useState<Medication[]>([]);
    const service = usePatientService();

    React.useEffect(
        () => {
            if (loading) {

                service.getIllnesses().then((i) => {
                    setIllnesses(i);
                    setLoading(false);

                });
                service.getMedications().then((m) => {
                    setMedications(m);
                    setLoading(false);

                });
            }


        }
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <button onClick={handleClickOpen} className="bg-primary bg-opacity-90 text-white text-sm shadow-sm font-semibold py-2 px-4 rounded-lg" >
                Add Diagnosis
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Diagnosis</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-96 p-2">

                        <Autocomplete options={
                            illnesses.map(i => i.name)
                        } renderInput={(params) => <TextField {...params} label="Illness" />}
                        />
                        <Autocomplete options={
                            medications.map(i => i.name)
                        } renderInput={(params) => <TextField {...params} label="Medication" />}
                        />
                        <TextField label='Notes' multiline minRows={3} />
                    </div>

                </DialogContent>
                <DialogActions>
                    <button className="px-4 py-2 text-gray-500" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm font-semibold" onClick={handleClose}>
                        Add
                    </button>

                </DialogActions>
            </Dialog>
        </div>
    );
}