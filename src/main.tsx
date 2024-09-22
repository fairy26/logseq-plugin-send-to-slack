import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

async function sendToSlack() {
  const block = await logseq.Editor.getCurrentBlock();
  if (block === null) {
    return;
  }

  const { content, uuid } = block;
  logseq.UI.showMsg(`
      [:div.p-2
      [:h1 "#${uuid}"]
      [:h2.text-xl "${content}"]]
    `);
}

function main() {
  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  logseq.Editor.registerSlashCommand("Send to Slack", sendToSlack);
}

logseq.ready(main).catch(console.error);
