import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import Shelf from '../components/Shelf';

class ListBooks extends Component {

	state = {
		books: []
	}

	/**
	 * Call when component did mount
	 * and get all user books and set state
	 *
	 * @memberof ListBooks
	 */
	componentDidMount() {
		BooksAPI.getAll().then( books => {
			this.setState({	books });
		});
	}

	/**
	 * Change shelf of book
	 *
	 * @param {Object} book Object of book
	 * @param {String} shelf Name of the shelf that the book will be moved
	 *
	 * @memberof ListBooks
	 */
	changeShelf = (book, shelf) => {

		BooksAPI.update(book, shelf);
		this.setState((currentState) => {
			const newState = currentState.books.filter(currentBook => currentBook.id !== book.id);
			book.shelf = shelf;
			return { books: newState.concat(book) }
		});
	}

	/**
	 * Filter books by shelf name
	 *
	 * @param {String} shelf Name of the shelf
	 *
	 * @memberof ListBooks
	 */
	filterShelf = (shelf) => {
		return (this.state.books.length > 0 && this.state.books.filter(book => {
			return book.shelf === shelf;
		})) || []
	}

	/**
	 * Render
	 *
	 * @returns
	 * @memberof ListBooks
	 */
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Shelf title='Currently Reading' changeShelf={this.changeShelf} books={this.filterShelf('currentlyReading')} />

						<Shelf title='Want to Read' changeShelf={this.changeShelf} books={this.filterShelf('wantToRead')} />

						<Shelf title='Read' changeShelf={this.changeShelf} books={this.filterShelf('read')} />
					</div>
				</div>
				<div className="open-search">
				<Link to="/search">Add a book</Link>
				</div>
			</div>
			)
		}


	}

	export default ListBooks;