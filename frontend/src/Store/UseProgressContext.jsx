import { createContext, useState } from "react";

const UserProgressContext = createContext({
	progress: '',
	showCart: () => {},
	hideCart: () => {},
	showCheckOut: () => {},
	hideCheckOut: () => {}
});

export function UserProgressContextProvider({ children }) {
	const [userProgress, setUserProgress] = useState('');

	const userProgressCtx = {
		progress: userProgress,
		showCart: () => {setUserProgress('cart')},
		hideCart: () => {setUserProgress('')},
		showCheckOut: () => {setUserProgress('checkout')},
		hideCheckOut: () => {setUserProgress('')}
	}

	return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;