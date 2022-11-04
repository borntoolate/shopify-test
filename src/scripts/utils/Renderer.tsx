import React, { Component } from "react"
import ReactDOM from "react-dom/client"

export function Renderer( element: JSX.Element|Component, target : string = "#app" ) : void
{
	const container = document.querySelector( target );
	const root = container ? ReactDOM.createRoot( container ) : null;

	root?.render (
		<>
			{ element }
		</>
	);
}
