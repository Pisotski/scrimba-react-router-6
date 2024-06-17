import { logout } from "../../controllers.js";
import { redirect } from "react-router-dom";
const loader = async ({ params }) => {
	// delete cookie
	// delete userid
	// kill session
	// delete cookie on back end
	logout();
	console.log(`user ${params.userId} logged out`);
	return redirect("/");
};

export { loader };
