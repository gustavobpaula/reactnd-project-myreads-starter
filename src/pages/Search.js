import React, { Component } from 'react'
import { Link } from "react-router-dom"
import sortBy from 'sort-by'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../components/Shelf'
import { DebounceInput } from 'react-debounce-input'

class Search extends Component {

	state = {
		term: '',
		myBooks: [],
		books: []
	}

	/**
	 * Call when component did mount
	 * and get all user books and set state
	 *
	 * @memberof Search
	 */
	componentDidMount() {
		BooksAPI.getAll().then(myBooks => {
			this.setState({ myBooks });
		});
	}

	/**
	 * Update term state when inout change
	 * Also takes from the API the books that combine with the term,
	 * Compare with myBooks state and merge found results
	 * And finally, set the state books with the result
	 *
	 * @param {Object} event Input event handle
	 *
	 * @memberof Search
	 */
	handleChange = (event) => {

		const newTerm = event.target.value;

		 this.setState({term: newTerm});

		if (!newTerm.trim()) {
			this.setState({ books: [] });
			return;
		}

		BooksAPI.search(newTerm.trim()).then(books => {
			books = books && books.length > 0 ? books.map(obj => this.state.myBooks.find(o => o.id === obj.id) || obj) : [];
			this.setState({books: books.sort(sortBy('title'))})
		});

	}

	/**
	 * Change shelf of book
	 *
	 * @param {Object} event Object of book
	 * @param {String} shelf Name of the shelf that the book will be moved
	 *
	 * @memberof Search
	 */
	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
	}

	/**
	 * Render
	 *
	 * @returns
	 * @memberof Search
	 */
	render() {

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<DebounceInput debounceTimeout={300} type="text" onChange={this.handleChange} placeholder="Search by title or author" value={this.state.term}/>

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