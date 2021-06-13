import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor, { useMonaco } from "@monaco-editor/react";
import "./style.css";
import { compile } from "mlogjs";
import mlogjsDef from "!!raw-loader!mlogjs/mlogjs.d.ts";

export default function App() {
	const monaco = useMonaco();

	const [compiled, setCompiled] = useState("");
	const [value, setValue] = useState("");

	useEffect(() => {
		if (monaco) {
			monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
				noLib: true,
				allowNonTsExtensions: true,
			});
			monaco.languages.typescript.javascriptDefaults.addExtraLib(mlogjsDef, "mlogjs");
		}
	}, [monaco]);

	return (
		<SplitPane split="horizontal" defaultSize="50%">
			<Editor
				onValidate={() => {
					try {
						setCompiled(compile(value));
					} catch (err) {
						setCompiled(err.message);
					}
				}}
				onChange={setValue}
				language="javascript"
			/>
			<Editor value={compiled} options={{ readOnly: true }}></Editor>
		</SplitPane>
	);
}
