import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page" className="wrapper">
			<h1>Sorry, the page you were looking for was not found</h1>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<Link to="/">
				<button>Return to home</button>
			</Link>
		</div>
	);
};

export { ErrorPage };
