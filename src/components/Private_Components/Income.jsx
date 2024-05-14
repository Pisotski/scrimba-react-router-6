import { populateIncomeTab } from "../../helpers";

const loader = async () => {
	populateIncomeTab();
	return null;
};

const Income = () => {
	return <div>Income</div>;
};

export { Income, loader };
