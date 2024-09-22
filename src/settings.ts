import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

const settings: SettingSchemaDesc[] = [
  {
    key: "slackBotToken",
    type: "string",
    title: "Slack Bot Token",
    description: "メッセージを送信するBotトークン (例: xoxb-your-slack-bot-token)。",
    default: "",
  },
  {
    key: "slackChannelId",
    type: "string",
    title: "Slack Channel ID",
    description: "メッセージ送信先のチャンネルID (例: CYYYYYY)。",
    default: "",
  },
];

export default settings;
