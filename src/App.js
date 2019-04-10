import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import Search from './pages/Search';
import ListBooks from './pages/ListBooks';

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
				<Route path='/search' component={Search} />
				<Route exact path='/' component={ListBooks} />
			</div>
		)
	}
}

export default BooksApp
