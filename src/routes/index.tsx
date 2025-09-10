import { createFileRoute } from "@tanstack/react-router";
import { JsonMonacoEditor } from "@/app/code/editor";
import Flow from "@/app/flow";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex">
      <JsonMonacoEditor width="25%" />
      <Flow />
      <div className="border border-green-500">
        ssacasc
      </div>
      {/* <Button>Test Button</Button> */}
    </div>
  );
}
