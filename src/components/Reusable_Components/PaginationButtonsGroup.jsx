import { useSearchParams } from "react-router-dom";
import "../../assets/PaginationButtonsGroup.css";

const PaginationButtonsGroup = ({ totalNumber }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("skip")) || 0;
	const pageSize = parseInt(searchParams.get("limit")) || 5;
	const star = parseInt(searchParams.get("star"));
	const lastPage = Math.ceil(totalNumber / pageSize);

	const handlePageChange = (e) => {
		e.preventDefault();
		const newPage = parseInt(e.currentTarget.value);
		const newParams = { skip: newPage, limit: pageSize };
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("skip", newPage.toString());
		setSearchParams(newSearchParams);
	};

	return (
		<div className="pagination-container">
			<button
				type="button"
				onClick={handlePageChange}
				value={page - 1}
				disabled={page === 0}
			>
				prev
			</button>
			<button type="button" value={0} onClick={handlePageChange}>
				1
			</button>
			{page < lastPage && page > 0 ? (
				<>
					<button type="button" value={page + 1}>
						{page + 1}
					</button>
					....
				</>
			) : (
				<>....</>
			)}

			<button
				type="button"
				value={lastPage}
				onClick={handlePageChange}
				disabled={page === lastPage}
			>
				{lastPage + 1}
			</button>
			<button
				type="button"
				onClick={handlePageChange}
				value={page + 1}
				disabled={page * pageSize >= totalNumber}
			>
				next
			</button>
		</div>
	);
};
export { PaginationButtonsGroup };
