import React from 'react'
import image404 from '../images/404.gif'

const Page404 = () => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<img src={image404} className="image-404" alt="Page not found" />
		</div>
	)
}

export default Page404;