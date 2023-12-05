import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import React from "react";

export function AddVisitDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                onChange={(age) => {

                                }}
                            >
                                <MenuItem value={'Physical'}>Physical</MenuItem>


                            </Select>
                        </FormControl>
                        <MobileDateTimePicker label="Event Date Time" className='w-full' orientation="landscape" views={[
                            "year",
                            "month",
                            "day",
                            "hours",
                            "minutes",


                        ]} />
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={30}
                                label="Duration"
                                onChange={(age) => {

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
                    <button className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm font-semibold" onClick={handleClose}>
                        Create
                    </button>

                </DialogActions>
            </Dialog>
        </div>
    );
}