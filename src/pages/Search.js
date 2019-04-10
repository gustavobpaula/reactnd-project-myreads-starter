import React, { Component } from 'react'
import { Link } from "react-router-dom"
import sortBy from 'sort-by'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../components/Shelf';

class Search extends Component {

	state = {
		term: '',
		myBooks: [],
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll().then(myBooks => {
			this.setState({ myBooks });
		});
	}

	handleChange = (event) => {

		const newTerm = event.target.value.trim();

		this.setState({term: newTerm})

		if (!newTerm) return;

		BooksAPI.search(newTerm).then(books => {
			books = books && books.length > 0 ? books.map(obj => this.state.myBooks.find(o => o.id === obj.id) || obj) : [];
			this.setState({books: books.sort(sortBy('title'))})
		})

	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
	}

	render() {

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" onChange={this.handleChange} placeholder="Search by title or author" value={this.state.term}/>

					</div>
				</div>
				<div className="search-books-results">
					<Shelf title='Result' changeShelf={this.changeShelf} books={this.state.books} />
				</div>
			</div>
		)
	}


}

export default Search;