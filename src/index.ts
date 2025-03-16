#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BacklogClient } from "./backlog/client";
import { registerIssueTools } from "./backlog/tools/issues";
import { registerWikiTools } from "./backlog/tools/wikis";

// Create server instance
const server = new McpServer({
  name: "backlog",
  version: "1.0.3",
});

const backlogClient = new BacklogClient();

// 各ツールを登録
registerIssueTools(server, backlogClient);
registerWikiTools(server, backlogClient);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.info("Backlog MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
