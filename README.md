# Backlog MCP Server

BacklogのAPIを使用してMCPサーバーを実装したプロジェクトです。

## 開発
### セットアップ

1. 依存関係のインストール:
```bash
bun install
```

2. 環境変数の設定:
`.env.example`をコピーして`.env`を作成し、必要な情報を設定してください：
```
BACKLOG_API_KEY=your_api_key_here
BACKLOG_SPACE_ID=your_space_id_here
BACKLOG_PROJECT_ID=your_project_id_here
```

### 実行方法

```bash
bun run src/index.ts
```

このサーバーはMCP（Model Context Protocol）に準拠しており、stdioトランスポートを使用して通信します。

## Cursorとの連携

Cursorで使用するには、以下の設定を行ってください：

### Windows

1. プロジェクト固有の設定:
   プロジェクトディレクトリに `.cursor/mcp.json` ファイルを作成し、以下の内容を設定します：
   ```json
   {
     "mcpServers": {
       "backlog": {
         "command": "npx",
         "args": ["@yh1715/backlog-mcp"],
         "env": {
           "BACKLOG_API_KEY": "your_api_key_here",
           "BACKLOG_SPACE_ID": "your_space_id_here",
           "BACKLOG_PROJECT_ID": "your_project_id_here"
         }
       }
     }
   }
   ```

2. グローバル設定:
   `%USERPROFILE%\.cursor\mcp.json` ファイルを作成し、以下の内容を設定します：
   ```json
   {
     "mcpServers": {
       "backlog": {
         "command": "npx",
         "args": ["@yh1715/backlog-mcp"],
         "env": {
           "BACKLOG_API_KEY": "your_api_key_here",
           "BACKLOG_SPACE_ID": "your_space_id_here",
           "BACKLOG_PROJECT_ID": "your_project_id_here"
         }
       }
     }
   }
   ```

### macOS

1. プロジェクト固有の設定:
   プロジェクトディレクトリに `.cursor/mcp.json` ファイルを作成し、以下の内容を設定します：
   ```json
   {
     "mcpServers": {
       "backlog": {
         "command": "npx",
         "args": ["@yh1715/backlog-mcp"],
         "env": {
           "BACKLOG_API_KEY": "your_api_key_here",
           "BACKLOG_SPACE_ID": "your_space_id_here",
           "BACKLOG_PROJECT_ID": "your_project_id_here"
         }
       }
     }
   }
   ```

2. グローバル設定:
   `~/.cursor/mcp.json` ファイルを作成し、以下の内容を設定します：
   ```json
   {
     "mcpServers": {
       "backlog": {
         "command": "npx",
         "args": ["@yh1715/backlog-mcp"],
         "env": {
           "BACKLOG_API_KEY": "your_api_key_here",
           "BACKLOG_SPACE_ID": "your_space_id_here",
           "BACKLOG_PROJECT_ID": "your_project_id_here"
         }
       }
     }
   }
   ```

設定後、Cursorを再起動すると、Agentが自動的にBacklogツールを使用できるようになります。

## 利用可能なツール

### 課題関連
- `backlog.issues.list`: 課題一覧の取得
- `backlog.issues.get`: 課題の詳細取得
- `backlog.issues.comments`: 課題コメントの取得
- `backlog.issues.attachment`: 課題の添付ファイルのダウンロード

### Wiki関連
- `backlog.wikis.list`: Wikiページ一覧の取得
- `backlog.wikis.get`: Wikiページの詳細取得
- `backlog.wikis.attachments`: Wiki添付ファイル一覧の取得
- `backlog.wikis.attachment`: Wiki添付ファイルのダウンロード

## 参考リンク
- [Backlog API](https://developer.nulab.com/ja/docs/backlog/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cursor MCP設定](https://docs.cursor.com/context/model-context-protocol)