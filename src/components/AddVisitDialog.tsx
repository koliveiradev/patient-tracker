import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";


export interface VisitDialogForm {
    type: string;
    start_time: Date;
    duration: number;

}
export function AddVisitDialog(props: { onSubmit: (form: VisitDialogForm) => void }) {
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState<VisitDialogForm>({
        type: 'Physical',
        start_time: new Date(),
        duration: 30
    });

    const handleFormChange = (e: VisitDialogForm) => {
        setForm(e);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.onSubmit(form);
        setOpen(false);
    }



    return (
        <div>

            <button onClick={handleClickOpen} className="bg-primary bg-opacity-90 text-white text-sm shadow-sm font-semibold py-2 px-4 rounded-lg" >
                + Add Create
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Visit</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-96 p-2">
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Visit Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={'Physical'}
                                label="Visit Type"
                                onChange={(type) => {
                                    handleFormChange({ ...form, type: type.target.value as string });
                                }}
                            >
                                <MenuItem value={'Physical'}>Physical</MenuItem>


                            </Select>
                        </FormControl>
                        <MobileDateTimePicker value={dayjs(form.start_time)} label="Event Date Time" className='w-full' orientation="landscape" views={[
                            "year",
                            "month",
                            "day",
                            "hours",
                            "minutes",


                        ]} onChange={(e) => {
                            if (e) {
                                handleFormChange({ ...form, start_time: (e.toDate() as Date) });

                            }
                        }} />
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={30}
                                label="Duration"
                                onChange={(duration) => {
                                    handleFormChange({ ...form, duration: duration.target.value as number });

                                }}
                            >
                                <MenuItem value={30}>30 Min</MenuItem>
                                <MenuItem value={45}>45 Min</MenuItem>
                                <MenuItem value={60}>1 Hour</MenuItem>
                                <MenuItem value={90}>1 Hour 30 Min</MenuItem>
                                <MenuItem value={120}>2 Hours</MenuItem>

                            </Select>
                        </FormControl>
                    </div>

                </DialogContent>
                <DialogActions>
                    <button className="px-4 py-2 text-gray-500" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm font-semibold" onClick={handleSubmit}>
                        Create
                    </button>

                </DialogActions>
            </Dialog>
        </div>
    );
}