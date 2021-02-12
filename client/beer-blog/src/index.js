import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { extendTheme } from "@chakra-ui/react"
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  colorScheme:"red"
}
// 3. extend the theme
// @ts-ignore
const theme = extendTheme({ config })
ReactDOM.render(
  <React.StrictMode>
     <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
