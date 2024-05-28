import { useSearchParams } from "react-router-dom";
import "../../assets/PaginationButtonsGroup.css";

const PaginationButtonsGroup = ({ totalNumber }) => {
	let [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("page")) || 1;
	const pageSize = parseInt(searchParams.get("pageSize")) || 5;
	const pagesArray = [...Array(Math.ceil(totalNumber / pageSize)).keys()];
	const star = parseInt(searchParams.get("star"));
	const handlePageChange = (newPage) => {
		console.log(star);
		if (star) {
			return setSearchParams({ page: newPage, pageSize, star });
		}
		setSearchParams({ page: newPage, pageSize });
	};

	return (
		<div className="pagination-container">
			<button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
				prev
			</button>
			{pagesArray.map((p) => {
				return (
					<span
						className={page == p + 1 ? "active-page" : null}
						key={`page-${p}`}
					>
						{p + 1}
					</span>
				);
			})}
			<button
				onClick={() => handlePageChange(page + 1)}
				disabled={page * pageSize >= totalNumber}
			>
				next
			</button>
		</div>
	);
};
export { PaginationButtonsGroup };
