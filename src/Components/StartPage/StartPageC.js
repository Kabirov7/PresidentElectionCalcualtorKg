import React, {Component, useState, useEffect, useContext} from 'react'
import {Button, Grid, Typography, makeStyles, withStyles} from '@material-ui/core'
import firebase from '../../util/Firebase'
import SelectBox from "../form/selectBox";
import Slider_ from "../form/slider";
import "./StartPageC.css"

// eslint-disable-next-line react-hooks/rules-of-hooks
export default class StartPageC extends Component {
	state = {
		questions: [],
		answers: {},
		forms: [],
		result: [],
		range: 50
	}


	componentDidMount() {
		firebase.firestore().collection("question").doc("TemplateKg").get()
			.then(doc => {
				this.setState({
					questions: doc.data().question
				})
			})
		console.log("Get questions")
	}

	returnAnswer = (answer, index) => {
		let answers = {...this.state.answers}
		answers[index] = answer
		this.setState({answers: answers})
		console.log(answers)
	}

	returnRange = (range) => {
		let ranges = range
		this.setState({range: ranges})
	}

	questions = () => {
		let forms = this.state.questions.map((el, i) => {
			let response = null
			if (el.type == "select") {
				return <SelectBox key={"profile_" + i} keyMap={el.key} index={i} title={el.question} response={response}
													answers={el.answers}
													returnAnswer={this.returnAnswer} required={el.required}/>
			}
		})
		return forms;
	}

	agree = () => {
		let content = (
			<div>
				<Typography style={{marginTop: "20px"}}>
					Эмне демекчибиз, сиз эң белгилүү талапкердин жеңишин каалайт экенсиз, демек сиз эч кабатырланбай эле койсоңуз
					болот. Участокко барып, добуш бериңиз, сиздин ага толук укугуңуз бар.
				</Typography>
			</div>
		)

		return content;
	}

	disagree = () => {

		let lastName = this.state.answers.candidate.split(" ")[1]
		let male = lastName[lastName.length - 1];

		let content = (
			<div className={"content"}>
				<Typography className={"contentText"}>Сиз {this.state.answers.candidate} абдан популярдуу жана биринчи турда эле
					жеңишке жете алат деп эсептейсиз, бирок сиз анын жеңишин каалабайсыз.
				</Typography>
				<Typography className={"contentText"}>
					Сиз жактырбаган талапкер президенттик орун үчүн катуу күрөшүүсү үчүн эмне кылыш керек? Бул күрөштү жок дегенде
					экинчи турга чейин кантип созсо болот?
				</Typography>
				<Typography className={"contentText"}>
					О, президенттик шайлоонун экинчи туру Кыргызстандын тарыхында укмуштуудай прецедент болот! Бизден <a
					href="https://kloop.kg/blog/2017/10/26/samara_elections_kg/" target="_blank"> бул мүмкүнчүлүктү 2017-жылы
					уурдап алышкан
				</a>, ошондуктан келгиле бул жолу аны алдырып жибербейли!
				</Typography>
				<Typography className={"contentText"}>Ал үчүн {this.state.answers.candidate} 50 пайыздан аз добушка ээ болушу
					керек. Буга кантип жетсе болот? Бул үчүн шайлоочулардын жарымынан көбү калган талапкерлерге же бардык
					талапкерлерге каршы добуш берүүсү гана жетиштүү.
				</Typography>
				<Typography className={"contentText"}>
					<b>
						МААНИЛҮҮ!
					</b> Ошол эле кезде сөзсүз түрдө участокко барып, добуш берүү керек!</Typography>
				<Typography className={"contentText"}>
					<b>
						Кыргыз Республикасынын президентин жана Кыргыз Республикасынын Жогорку Кеңешинин депутаттарын шайлоо жөнүндө
						мыйзамы, 55-берене, 3-пункт;
					</b> «Добуш берүүнүн биринчи турунда <b>
					шайлоого катышкан
				</b> бардык шайлоочулардын добуштарынын жарымынан көбүн алган талапкер Президенттин кызмат ордуна шайланды деп
					эсептелет».
				</Typography>

				<Slider_ returnRange={this.returnRange} candidate={this.state.answers.candidate}/>
				<div className={"resultContainer"}>
					<p>
						Шайлоого келип бергендердин саны ушундай болгондо мынча адам добуш берет:
					</p>
					<span>
						{Math.ceil(3544403 * this.state.range / 100)}
					</span>
				</div>
				<div className={"resultContainer"}>
					<p>
						{this.state.answers.candidate} биринчи турда жеңишке жетпеши үчүн башка талапкерлер үчүн мынча добуш  керектелет:
					</p>
					<span>
						{Math.ceil((Math.ceil(3544403 * this.state.range / 100)) / 2 + 1)}
					</span>
				</div>
			</div>
		)

		return content

	}


	render() {
		let d = '';
		if (this.state.answers.candidate != undefined && this.state.answers.agree != undefined) {
			d = (this.state.answers.agree == "Ооба") ? this.agree() :
				(this.state.answers.agree == "Жок") ? this.disagree() :
					<div></div>
		}

		return (
			<div>
				{this.questions()}
				{d}
			</div>
		)
	}
}
