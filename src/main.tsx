import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import settings from "./settings";

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

async function showSettings() {
  const slackBotToken: string = logseq.settings?.slackBotToken;
  const slackChannelId: string = logseq.settings?.slackChannelId;
  logseq.UI.showMsg(`
    [:div.p-2
    [:h2.text-xl "Slack Bot Token: ${slackBotToken}"]
    [:h2.text-xl "Channel ID: ${slackChannelId}"]]
  `);
}

function main() {
  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  logseq.useSettingsSchema(settings);
  logseq.Editor.registerSlashCommand("Send to Slack", sendToSlack);
  logseq.Editor.registerSlashCommand("Show Slack settings", showSettings);
}

logseq.ready(main).catch(console.error);
