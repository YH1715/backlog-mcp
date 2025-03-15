import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BacklogClient } from "../client";
import { BACKLOG_PROJECT_ID } from "../../config";

export function registerIssueTools(server: McpServer, backlogClient: BacklogClient) {
  // 課題一覧の取得
  server.tool(
    "backlog.issues.list",
    "課題一覧を取得",
    {
      statusId: z.array(z.number()).optional().describe("ステータスID"),
      assigneeId: z.array(z.number()).optional().describe("担当者ID"),
      categoryId: z.array(z.number()).optional().describe("カテゴリID"),
      keyword: z.string().optional().describe("検索キーワード"),
      sort: z.string().optional().describe("ソートフィールド"),
      order: z.enum(["asc", "desc"]).optional().describe("ソート順"),
      count: z.number().optional().describe("取得する課題数"),
    },
    async (params) => {
      const issues = await backlogClient.getIssues({
        ...params,
        projectId: BACKLOG_PROJECT_ID,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }]
      };
    }
  );

  // 課題詳細の取得
  server.tool(
    "backlog.issues.get",
    "課題の詳細を取得",
    {
      issueIdOrKey: z.string().describe("課題のIDまたはキー"),
    },
    async ({ issueIdOrKey }) => {
      const issue = await backlogClient.getIssue(issueIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }]
      };
    }
  );

  // 課題コメントの取得
  server.tool(
    "backlog.issues.comments",
    "課題のコメント一覧を取得",
    {
      issueIdOrKey: z.string().describe("課題のIDまたはキー"),
      count: z.number().optional().describe("取得するコメント数"),
      order: z.enum(["asc", "desc"]).optional().describe("ソート順"),
    },
    async (params) => {
      const comments = await backlogClient.getIssueComments(params.issueIdOrKey, {
        count: params.count,
        order: params.order,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(comments, null, 2) }]
      };
    }
  );

  // 課題添付ファイルの取得
  server.tool(
    "backlog.issues.attachment",
    "課題の添付ファイルを取得",
    {
      issueIdOrKey: z.string().describe("課題のIDまたはキー"),
      attachmentId: z.string().describe("添付ファイルのID"),
    },
    async ({ issueIdOrKey, attachmentId }) => {
      const attachment = await backlogClient.getIssueAttachment(issueIdOrKey, attachmentId);
      return {
        content: [{ type: "text", text: JSON.stringify(attachment, null, 2) }]
      };
    }
  );
} 