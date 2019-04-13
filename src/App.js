import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Search from './pages/Search';
import ListBooks from './pages/ListBooks';
import Page404 from './pages/404';

class BooksApp extends Component {

	/**
	 * Render
	 *
	 * @returns
	 * @memberof BooksApp
	 */
	render() {
		return (
			<div className="app">
				<Switch>
					<Route path='/search' component={Search} />
					<Route exact path='/' component={ListBooks} />
					<Route component={Page404} />
				</Switch>
			</div>
		)
	}
}

export default BooksApp
