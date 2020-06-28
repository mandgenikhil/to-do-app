import React, { Component } from 'react';
import './index.scss';
// import Loader from 'react-loader-spinner';
import APIURLS from '../../api-urls/to-do-api';

export class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isauth: false,
			chart: null,
			userName: null,
			isError:false,
			errorMsg:''
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidMount() {
		localStorage.clear();
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.props.Token !== null && this.props.Token !== '' && prevProps.Token !== this.props.Token) {
	// 		this.props.history.push('/Dashboard/People');
	// 	}
	// }

	

	handleKeyDown(e) {
		if (e.key === 'Enter') {
			var userNameNode = document.getElementById('username').value;
			var userPermNode = document.getElementById('password').value;

			if (
				userNameNode !== null &&
				userPermNode !== null &&
				userNameNode.trim() !== '' &&
				userPermNode.trim() !== ''
			) {
				var input = document.getElementById('myInput');

				input.addEventListener('keyup', function(event) {
					if (event.keyCode === 13) {
						event.preventDefault();
						document.getElementById('myBtn').click();
					}
				});

				fetch(APIURLS.V1.validateUser, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                        
                    },
                    body: JSON.stringify({
                        
                            username: userNameNode,
                            password: userPermNode
                        
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {	
                        console.log("-->",json)				
                        this.setState({
                            key: json['key']
                        });
                        console.log("Aya 1")
                        if (json['key'] !== undefined) {
                            console.log("Aya 2")
                            localStorage.setItem('key', json['key']);
                            localStorage.setItem('user_name', json['user']['username']);						
                            this.props.history.push('/ToDo');
                            
                        } 
                        else 
                        {
                            this.setState({
                                isError:true,
                                errorMsg:"Please enter valid credentials"
                            })
                        }
    
                        
                    });
			}
		}
	}

	getUserDetailsData = () => {
        console.log("-->")	
		var userNameNode = document.getElementById('username').value;
		var userPermNode = document.getElementById('password').value;

		if (
			userNameNode !== null &&
			userPermNode !== null &&
			userNameNode.trim() !== '' &&
			userPermNode.trim() !== ''
		) {
			var input = document.getElementById('myInput');

			input.addEventListener('keyup', function(event) {
				if (event.keyCode === 13) {
					event.preventDefault();
					document.getElementById('myBtn').click();
				}
			});

			fetch(APIURLS.V1.validateUser, {
				method: 'POST',
				mode: 'cors',
				headers: {
                    'Content-Type': 'application/json'
                    
				},
				body: JSON.stringify({
					
						username: userNameNode,
						password: userPermNode
					
				})
			})
				.then((response) => response.json())
				.then((json) => {	
                    console.log("-->",json)				
					// this.setState({
					// 	key: json['key']
					// });

					if (json['key'] !== undefined) {
                        localStorage.setItem('key', json['key']);
                        localStorage.setItem('user_name', json['user']['username']);						
                        this.props.history.push('/ToDo');
					} 
					else 
					{
						this.setState({
							isError:true,
							errorMsg:"Please enter valid credentials"
						})
					}

					
				});
		}
	};

	render() {
		const LoginBoxContent = () => {
			return (
				<div>
					<div className="sufficiency-of-input ">
						<p className="heading-font">To Do Application</p>
					</div>
					<div>
						{' '}
						<div className="card-box-margin">
							<div>
								<form action="" className="box bg-color-box">
									<div className="field">
										<label for="" className="label">
											UserName
										</label>
										<div className="control has-icons-left bg-color-box">
											<input
												id="username"
												type="email"
												placeholder="e.g. username@test.com"
												className="input"
											/>
											<span className="icon is-small is-left">
												<i className="fa fa-envelope" />
											</span>
										</div>
									</div>
									<div className="field">
										<label for="" className="label">
											Password
										</label>
										<div className="control has-icons-left bg-color-box">
											<input
												id="password"
												type="password"
												placeholder="*******"
												className="input"
												required
												onKeyDown={this.handleKeyDown}
											/>
											<span className="icon is-small is-left">
												<i className="fa fa-lock" />
											</span>
										</div>
									</div>
									<div className="field">
										<a
											href
											id="myInput"
											className="button is-info"
											onClick={() => this.getUserDetailsData()}
										>
											Login
										</a>										
									</div>
									{this.state.isError ? <div className="error-msg">{this.state.errorMsg}</div> : null}
								</form>
							</div>
						</div>
					</div>
					<div />
				</div>
			);
		};
		if (this.state.isauth === false) {
			return (
				<div className="container-fluid home">
					<nav className="navbar navbar-align nav-home" role="navigation" aria-label="main navigation">
						<div className="navbar-brand" />
					</nav>
					<LoginBoxContent showDetails={this.state.showModal} closeModal={this.toggleAnalyzerModal} />
				</div>
			);
		}
		else
		{		
        return "test"	
		// return<Loader
		// 		className="loader-display"
		// 		type="Oval"
		// 		color="#001e59"
		// 		height={100}
		// 		width={100}				
		// 		visible={true}
		// 	/>
		}
	}
}

// const mapStateToProps = (state) => {	
// 	return {
// 		UserName: state.LoginDataReducer.UserName,
// 		PassWord: state.LoginDataReducer.passWord,
// 		IsAuthenticated: state.LoginDataReducer.IsAuthenticated,
// 		Token: state.LoginDataReducer.Token
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getUserDetails: (userName, passWord, isauth, token) => {
// 			dispatch(credentialAuthenticator(userName, passWord, isauth, token));
// 		}
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginPage;
