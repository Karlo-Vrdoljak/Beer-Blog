import { Box } from "@chakra-ui/react";
import Nav from "components/nav/Nav";
import Views from "components/router/Views";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
	return (
		// @ts-ignore
		<Router>
			<Nav></Nav>
			<Box maxH="calc(100vh - 56px)" overflowY="auto">
				<Views></Views>
			</Box>
		</Router>
	);
}

export default App;
