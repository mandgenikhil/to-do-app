import React, { Component } from 'react';
import './index.scss';
import ToDoItem from './to-do-item';
import APIURLS from '../../api-urls/to-do-api';

export class ToDo extends Component {
	state = {
		question: '',
		answer: '',
		responseList: []
	};

	componentDidMount() {
		if (localStorage.getItem("key") === null) {
			this.props.history.push('/');
			localStorage.clear();
		}
		else {

			fetch(APIURLS.V1.gettodos, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token ' + localStorage.getItem("key")

				},

			})
				.then((response) => response.json())
				.then((json) => {
					console.log("-->", json)
					this.setState({
						key: json['key']
					});
					console.log("Aya 1")
					if (json['response'] !== undefined) {

						this.setState({
							responseList: json['response']
						});
					}
					else {
						this.setState({
							isError: true,
							errorMsg: "Please enter valid credentials"
						})
					}


				});


		}
	}



	clearAll = () => {

		localStorage.clear();
		this.props.history.push('/');
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			question: event.target.value
		});
	};

	clearData = () => {
		this.setState({
			question: ' ',
			answer: '',
			responseList: []

		});
	};

	onEnterClickAction() {
		fetch('http://localhost:8000/api/v1/bot', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: this.state.question
			})
		})
			.then((response) => response.json())
			.then((json) => {
				if (json['res'] !== undefined) {
					var responseListData = this.state.responseList;
					this.setState({
						answer: json['res']
					});

					responseListData.push({
						question: this.state.question,
						answer: this.state.answer
					});

					this.setState({
						answer: '',
						responseList: responseListData
					});
				}
			});
	}

	render() {
		return (
			<div>
				<header>
					<nav class="navbar" role="navigation" aria-label="main navigation">
						<div class="navbar-brand">
							<a class="navbar-item" href="/ToDo">
								<img alt="" src="https://img.icons8.com/fluent/48/000000/todo-list.png" />
							</a>
							<text class="navbar-item">
								To-Do
      </text>


						</div>

						<div id="navbarBasicExample" class="navbar-menu">
							<div class="navbar-start">


							</div>
						</div>

						<div class="navbar-end">
							<div class="navbar-item ">
								<a href >Hi {localStorage.getItem("user_name").toUpperCase()}</a></div>
							<div class="navbar-item">

								<div class="buttons">

									<button onClick={this.clearAll} class="button is-light">
										Log Out
          </button>
								</div>
							</div>
						</div>
					</nav>
				</header>

				<article class="box">
					{this.state.responseList.map((elementData) => {
						return (
							<ToDoItem todo={elementData} />

						);
					})}
					<nav class="level is-mobile">
						<div class="level-left">

						</div>
						{/* <div class="level-right">
							<span><button className="button info" onClick={() => this.onEnterClickAction()}>
								SEND
							</button>
							</span>
							<span><button className="button info" onClick={() => this.clearData()}>
								Clear
							</button>
							</span>
						</div> */}
					</nav>
					{/* <div>
						Chatbot:
						{this.state.answer !== '' ? this.state.answer : null}
					</div> */}
				</article>
			</div>
		);
	}
}

export default ToDo;
