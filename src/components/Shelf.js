import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Shelf = (props) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.length > 0 && props.books.map((book, index) => (
						<li key={index}>
							<Book book={book} changeShelf={props.changeShelf} />
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}

Shelf.propTypes = {
	books: PropTypes.array.isRequired,
	changeShelf: PropTypes.func.isRequired,
	title: PropTypes.string

}

export default Shelf;