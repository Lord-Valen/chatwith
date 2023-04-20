import { Command } from "@commander-js/extra-typings";
import { chat } from "./chat/index.js";
import { upload } from "./upload/index.js";

new Command("chatwith")
    .addCommand(chat, { isDefault: true })
    .addCommand(upload)
    .parse();
