import { logout } from "../../controllers.js";
import { redirect } from "react-router-dom";
const loader = async () => {
	// delete cookie
	// delete userid
	// kill session
	// delete cookie on back end
	const userName = localStorage.getItem("userName");
	logout();
	console.log(`user ${userName} logged out`);
	return redirect("/");
};

export { loader };
