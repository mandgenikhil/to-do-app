import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ToDo from './screens/todo'
import Login from './screens/login'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<section className="hero">
					<div className="hero-body">
						<div className="container ">
							<h1 className="title">Oops! Something went wrong!</h1>
							<h5>
								Please <a href="Dashboard/Home" >Click</a> on this link to go back to the home page and
								Please reach out to <a href="mailto:nikhil.mandge@test.com">Nikhil Mandge</a> if the
								problem persists after a retry.
							</h5>
						</div>
					</div>
				</section>
			);
		}		
		return this.props.children;
	}
}

const routing = (
	<Router>
		<ErrorBoundary>						
			<Route exact path="/" component={Login} />	
			<Route exact path="/ToDo" component={ToDo} />					
		</ErrorBoundary>
	</Router>
);

ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
