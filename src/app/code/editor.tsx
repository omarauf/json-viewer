import type { OnMount } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store";

type Props = {
  schema?: string;
  width?: string;
};

export function JsonMonacoEditor({ schema, width }: Props) {
  const [value, setValue] = useStore(useShallow((s) => [s.value, s.setValue]));

  const [status, setStatus] = useState({
    line: 1,
    column: 1,
    language: "json",
  });

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // JSON language diagnostics & schema support
    if (schema) {
      const id = typeof schema === "string" ? schema : "inmemory://model/schema.json";
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: id,
            fileMatch: ["*"],
            schema: typeof schema === "string" ? undefined : schema,
          },
        ],
      });
      // If schema is a remote URL, pass that URL as uri and omit schema field.
    } else {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({ validate: true });
    }

    // Optional: format on Ctrl/Cmd+S
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    editor.onDidChangeCursorPosition((e) => {
      const pos = e.position;
      setStatus((prev) => ({
        ...prev,
        line: pos.lineNumber,
        column: pos.column,
      }));
    });

    // Update language if it changes
    monaco.editor.onDidCreateModel((model) => {
      setStatus((prev) => ({
        ...prev,
        language: model.getLanguageId(),
      }));
    });
  };

  return (
    <div className="flex flex-col h-screen" style={{ width: width ?? "30%" }}>
      <Editor
        theme="vs-dark"
        height="100%"
        width="100%"
        defaultLanguage="json"
        onMount={handleEditorDidMount}
        value={JSON.stringify(value, null, 2)}
        onChange={(v) => setValue(JSON.parse(v ?? "{}"))}
        options={{
          minimap: { enabled: false },
          formatOnPaste: true,
          formatOnType: true,
          readOnly: false,
          automaticLayout: true,
          // scrollBeyondLastColumn: 4,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          suggest: {
            showStatusBar: true,
          },
        }}
      />

      <div className="bg-gray-900 text-gray-200 text-sm px-4 py-1 flex justify-between">
        <span>
          Ln {status.line}, Col {status.column}
        </span>
        <span>{status.language}</span>
      </div>
    </div>
  );
}
