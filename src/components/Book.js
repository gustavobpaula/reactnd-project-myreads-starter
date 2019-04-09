import React, { Component } from 'react';

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

		handleChange(event) {
			this.props.changeShelf(this.props.book, event.target.value);
		}

		/**
		 * Render
		 *
		 * @returns
		 * @memberof Book
		 */
		render() {
			console.log('props', this.props);
			return (
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
						<div className="book-shelf-changer">
							<select defaultValue={this.props.book.shelf} onChange={event => this.props.changeShelf(this.props.book, event.target.value)}>
								<option value="move" disabled>Move to...</option>
								{this.selectOptions()}
							</select>
						</div>
					</div>
					<div className="book-title">{this.props.book.title}</div>
					<div className="book-authors">{this.props.book.authors[0]}</div>
				</div>
			)
		}


}

export default Book;