import React from "react";
import ReactDOM from "react-dom";
import { Main } from "@lastui/rocker/runtime";
import { getContext } from "./service";
import "bulma/bulma.sass";
import "font-awesome/css/font-awesome.css";

window.addEventListener("load", (event) => {
	const main = <Main fetchContext={getContext} />;
	ReactDOM.render(main, document.getElementById("mount"));
});
