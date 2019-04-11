import React, { Component } from 'react';
import PropTypes from 'prop-types';

const options = [
	{ value: 'currentlyReading', label: 'Currently Reading'},
	{ value: 'wantToRead', label: 'Want to Read'},
	{ value: 'read', label: 'Read'},
	{ value: 'none', label: 'None'}
]

class Book extends Component {

		/**
		 * Render book options of select
		 *
		 * @returns
		 * @memberof Book
		 */
		selectOptions() {
			return options.map((option, index) => (
				<option key={index} value={option.value}>{option.label}</option>
			));
		}

		/**
		 * Select to change Shelf
		 *
		 * @param {Object} event Select event handle
		 * @memberof Book
		 */
		handleChange = (event) => {
			this.props.changeShelf(this.props.book, event.target.value);
		}

		/**
		 * Render
		 *
		 * @returns
		 * @memberof Book
		 */
		render() {
			try {
				return (
					<div className="book">
						<div className="book-top">
							<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail ? this.props.book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'}")` }}></div>
							<div className="book-shelf-changer">
								<select value={this.props.book.shelf || 'none'} onChange={this.handleChange}>
									<option value="move" disabled>Move to...</option>
									{this.selectOptions()}
								</select>
							</div>
						</div>
						<div className="book-title">{this.props.book.title}</div>
						<div className="book-authors">{this.props.book.authors && this.props.book.authors.join(', ')}</div>
					</div>
				)
			} catch (error) {
				return null
			}
		}
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	changeShelf: PropTypes.func.isRequired

}

export default Book;