import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import settings from "./settings";
import { WebClient } from "@slack/web-api";

const web = new WebClient(logseq.settings?.slackBotToken);

async function sendToSlack() {
  const block = await logseq.Editor.getCurrentBlock();
  if (block === null) {
    return;
  }

  const { content, uuid } = block;
  if (content === "") {
    return;
  }

  const channelId = logseq.settings?.slackChannelId;
  if (channelId === "") {
    logseq.UI.showMsg("Channel ID が設定されていません");
    return;
  }

  const result = await web.chat.postMessage({
    channel: channelId,
    text: content,
  });

  if (!result.ok) {
    logseq.UI.showMsg(`
    [:div.p-2
      [:h2 "送信できませんでした"]
      [:p "エラー: ${result.error}"]
    ]
  `);
  }

  const suffix = `p${result.ts?.replace(".", "")}`;
  logseq.UI.showMsg(`
    [:div.p-2
      [:h2 "送信しました"]
      [:p "https://TODO.slack.com/archives/${result.channel}/${suffix}"]
    ]
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
