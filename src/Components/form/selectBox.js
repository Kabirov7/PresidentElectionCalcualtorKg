import React, { useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import './form.css'

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 100,
		maxWidth: 300
	},
	question:{
		fontFamily: "PT Serif",
		fontWeight:"700",
		fontSize: 20
	}
}));
export default function SelectBox(props){
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const {index, response, required, locked, keyMap } = props

	useEffect(() => {
		if (response) {
			setValue(response)
		}
	}, [response])

	const handleChange = (event) => {
		setValue(event.target.value);
		props.returnAnswer(event.target.value, keyMap);
	};


	const handleClose = (event) => {
		setOpen(false)
	};

	const handleOpen = (event) => {
		setOpen(true)
	}

	return (
		<div>
			<Typography className={classes.question} style={{marginBottom: 5, marginTop: 20}}>{props.title}</Typography>
			<FormControl className={classes.formControl} disabled={locked}>
				<InputLabel id="controlled-open-select-label">Тандоо</InputLabel>
				<Select
					labelId="controlled-open-select-label"
					id={"select" + index}
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={value}
					onChange={handleChange}>
					{props.answers.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
				</Select>
			</FormControl>
		</div>
	)
}