import React, {useEffect, useState} from 'react';
import {Slider, makeStyles, Typography, Grid} from "@material-ui/core";
import './form.css'

const useStyles = makeStyles({
	root: {
		paddingTop: "25px",
	},
	input: {
		width: 42,
	},
	text: {
		fontSize: "18px",
		fontFamily: "PT Serif",
		fontWeight: "700",
	},
	supportText: {
		fontFamily: "PT Serif",
		fontWeight: "300",
		margin:"10px 0px 15px 0px",

	}
});


export default function Slider_(props) {
	const [value, setValue] = useState(50);
	const classes = useStyles();

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		props.returnRange(newValue);
	};

	let lastName = props.candidate.split(" ")[1]
	let male = lastName[lastName.length - 1];


	return (<div className={classes.root} style={{fontFamily: "PT Serif"}}>
			<Typography className={classes.text}>
				{props.candidate} президенттик шайлоонун биринчи турунда эле
				жеңишке жетпеши үчүн башка талапкерлерге же баарына каршы канча адам добуш бериши керек?
			</Typography>
			<Typography
				className={classes.supportText}
			>
				Бул суроого жооп алуу үчүн шайлоого канча адам келерин белгилеңиз:
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						valueLabelDisplay="auto" aria-label="pretto slider"
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
					/>
				</Grid>
			</Grid>
		</div>
	);
}