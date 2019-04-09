import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI'
import Shelf from '../components/Shelf';

class ListBooks extends Component {

	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then( books => {
			this.setState({	books });
		});
	}

	changeShelf = (book, shelf) => {

		BooksAPI.update(book, shelf);
		this.setState((currentState) => {
			const newState = currentState.books.filter(currentBook => currentBook.id !== book.id);
			book.shelf = shelf;
			return { books: newState.concat(book) }
		});
	}

	filterShelf = (shelf) => {
		return this.state.books.length > 0 && this.state.books.filter(book => {
			return book.shelf === shelf;
		})
	}

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