import { useSearchParams } from "react-router-dom";
import "../../assets/PaginationButtonsGroup.css";
import PaginationPrev from "../../assets/pagination_prev.svg?react";
import PaginationNext from "../../assets/pagination_next.svg?react";

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
				className="pagination-button pagination-prev"
				onClick={handlePageChange}
				value={page - 1}
				disabled={page === 0}
			>
				<PaginationPrev className="trash-bin-SVG">SVG</PaginationPrev>
			</button>

			<button
				type="button"
				className="pagination-button"
				value={0}
				onClick={handlePageChange}
				disabled={page < 1}
			>
				1
			</button>
			{page < lastPage && page > 0 ? (
				<>
					<button type="button" value={page + 1} className="pagination-button">
						{page + 1}
					</button>
					....
				</>
			) : (
				<>
					<button visibility="hidden" className="pagination-button">
						{" "}
					</button>
					....
				</>
			)}

			<button
				type="button"
				value={lastPage}
				onClick={handlePageChange}
				disabled={page === lastPage}
				className="pagination-button"
			>
				{lastPage + 1}
			</button>
			<button
				type="button"
				className="pagination-button pagination-next"
				onClick={handlePageChange}
				value={page + 1}
				disabled={page * pageSize >= totalNumber}
			>
				<PaginationNext className="trash-bin-SVG">SVG</PaginationNext>
			</button>
		</div>
	);
};
export { PaginationButtonsGroup };
