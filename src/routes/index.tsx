import { createFileRoute } from "@tanstack/react-router";
import { JsonMonacoEditor } from "@/app/code/editor";
import Flow from "@/app/flow";
import { Output } from "@/app/output";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex">
      <JsonMonacoEditor width="25%" />
      <Flow />
      {/* <Output className="w-1/4" /> */}
    </div>
  );
}
