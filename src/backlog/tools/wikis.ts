import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BacklogClient } from "../client";
import { BACKLOG_PROJECT_ID } from "../../config";

export function registerWikiTools(
  server: McpServer,
  backlogClient: BacklogClient,
) {
  // Wikiページ一覧の取得
  server.tool(
    "backlog.wikis.list",
    "Wikiページ一覧を取得",
    {
      keyword: z.string().optional().describe("検索キーワード"),
    },
    async (params) => {
      // 環境変数から指定されたプロジェクトIDを使用
      const wikiPages = await backlogClient.getWikiPages({
        ...params,
        projectIdOrKey: BACKLOG_PROJECT_ID,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(wikiPages, null, 2) }],
      };
    },
  );

  // Wikiページ詳細の取得
  server.tool(
    "backlog.wikis.get",
    "Wikiページの詳細を取得",
    {
      wikiId: z.number().describe("WikiページのID"),
    },
    async ({ wikiId }) => {
      const wikiPage = await backlogClient.getWikiPage(wikiId);
      return {
        content: [{ type: "text", text: JSON.stringify(wikiPage, null, 2) }],
      };
    },
  );

  // Wiki添付ファイル一覧の取得
  server.tool(
    "backlog.wikis.attachments",
    "Wikiページの添付ファイル一覧を取得",
    {
      wikiId: z.number().describe("WikiページのID"),
    },
    async ({ wikiId }) => {
      const attachments = await backlogClient.getWikiAttachments(wikiId);
      return {
        content: [{ type: "text", text: JSON.stringify(attachments, null, 2) }],
      };
    },
  );

  // Wiki添付ファイルの取得
  server.tool(
    "backlog.wikis.attachment",
    "Wikiページの添付ファイルを取得",
    {
      wikiId: z.number().describe("WikiページのID"),
      attachmentId: z.number().describe("添付ファイルのID"),
    },
    async ({ wikiId, attachmentId }) => {
      const attachment = await backlogClient.getWikiAttachment(
        wikiId,
        attachmentId,
      );
      return {
        content: [{ type: "text", text: JSON.stringify(attachment, null, 2) }],
      };
    },
  );
}
