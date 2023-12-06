import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button, Autocomplete, createFilterOptions } from "@mui/material";
import { DatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { usePatientService } from "../services/Patient";
import { Diagnosis, Illness } from "../models/Diagnosis";
import { Medication } from "../models/Medication";
import dayjs from "dayjs";


export interface DiagnosisEditForm {
    illness: string | null;
    medication: string | null;
    start_date: Date;
    end_date: Date;
    notes: string;
}

export interface DiagnosisSubmitForm {
    diagnosis_id?: number;
    prescription_id?: number;
    illness: number;
    medication: number;
    start_date: Date;
    end_date: Date;
    notes: string;
}
const freshForm = {
    illness: null,
    medication: null,
    start_date: new Date(),
    end_date: new Date(),
    notes: ''
};
export function AddDiagnosisDialog(props: { onSubmit: (form: DiagnosisSubmitForm) => void, original?: DiagnosisEditForm | null }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [illnesses, setIllnesses] = React.useState<Illness[]>([]);
    const [medications, setMedications] = React.useState<Medication[]>([]);
    const [form, setForm] = React.useState<DiagnosisEditForm>(props.original ?? freshForm);
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

        setForm(props.original ?? freshForm);


        setOpen(false);
    };

    const handleSubmit = () => {
        props.onSubmit({
            illness: illnesses.find(i => i.name === form.illness)!.id,
            medication: medications.find(i => i.name === form.medication)!.id,

            start_date: form.start_date, end_date: form.end_date, notes: form.notes
        });
        if (!props.original) {
            setForm(freshForm);
        }
        setOpen(false);
    }

    const OPTIONS_LIMIT = 10;
    const defaultFilterOptions = createFilterOptions();
    const filterOptions = (options: any, state: any) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };

    const handleFormChange = (e: DiagnosisEditForm) => {
        setForm(e);
    }

    return (
        <div>

            <button onClick={handleClickOpen} className="bg-primary bg-opacity-90 text-white text-sm shadow-sm font-semibold py-2 px-4 rounded-lg" >
                Add Diagnosis
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Diagnosis</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-96 p-2">

                        <Autocomplete
                            value={form.illness}
                            onChange={(event: any, newValue: any) => {
                                handleFormChange({ ...form, illness: newValue });
                            }}
                            options={
                                illnesses.map(i => i.name)
                            } filterOptions={filterOptions}
                            renderInput={(params) => <TextField {...params} label="Illness" />}
                        />
                        <Autocomplete
                            onChange={(event: any, newValue: any) => {
                                handleFormChange({ ...form, medication: newValue });
                            }}
                            options={
                                medications.map(i => i.name)
                            }
                            value={form.medication}
                            filterOptions={filterOptions}
                            renderInput={(params) => <TextField {...params} label="Medication" />}
                        />
                        <DatePicker value={dayjs(form.start_date)} label="Start Date" className='w-full' orientation="landscape" views={[
                            "year",
                            "month",
                            "day",



                        ]} onChange={(e) => {
                            if (e) {
                                handleFormChange({ ...form, start_date: (e.toDate() as Date) });

                            }
                        }} />
                        <DatePicker value={dayjs(form.end_date)} label="End Date" minDate={dayjs(form.start_date)} className='w-full' orientation="landscape" views={[
                            "year",
                            "month",
                            "day",



                        ]} onChange={(e) => {
                            if (e) {
                                handleFormChange({ ...form, end_date: (e.toDate() as Date) });

                            }
                        }} />
                        <TextField value={form.notes} label='Notes' multiline minRows={3} onChange={(e) => {
                            handleFormChange({ ...form, notes: e.target.value });
                        }} />
                    </div>

                </DialogContent>
                <DialogActions>
                    <button className="px-4 py-2 text-gray-500" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm font-semibold" onClick={handleSubmit}>
                        Add
                    </button>

                </DialogActions>
            </Dialog>
        </div>
    );
}