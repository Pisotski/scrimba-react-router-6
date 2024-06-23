import { useRouteError, Link, useNavigate } from "react-router-dom";
import "../assets/ErrorPage.css";

const ErrorPage = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	return (
		<div id="error-page" className="wrapper error-page">
			<div
				className="clear-filters"
				onClick={() => {
					navigate(-1);
				}}
			>
				&larr; <span>go back</span>
			</div>
			<h2>Sorry, the page you were looking for was not found</h2>
			<p>
				<i>
					{error.response.data.message || error.statusText || error.message}
				</i>
			</p>
			{/* <p>
				<i>{error.response.data.error}</i>
			</p> */}
			<Link to="/">
				<button type="submit" className="button wide tall luxury">
					Return to home page
				</button>
			</Link>
		</div>
	);
};

export { ErrorPage };
