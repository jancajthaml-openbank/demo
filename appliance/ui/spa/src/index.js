import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "@lastui/rocker/bootstrap";
import { getContext } from "./service";
import "bulma/bulma.sass";
import "font-awesome/css/font-awesome.css";

document.title = "Openbank Demo"

const root = ReactDOM.createRoot(document.getElementById("mount"));

const main = <Main fetchContext={getContext} />;

root.render(main);
