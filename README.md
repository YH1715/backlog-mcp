# Backlog MCP Server

- BacklogのAPIを使用してMCPサーバーを実装したプロジェクトです。
- プロジェクト固定かつ、読み取り操作のみを行います。

## 利用方法（CursorまたはClaude Desktopとの連携）

以下の設定を行ってください：

1. mcp.jsonを作成します
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

2. OSやスコープに合わせてmcp.jsonを配置します
- プロジェクト固有の設定の場合：
    - プロジェクトディレクトリに `.cursor/mcp.json` を配置
-  グローバル設定の場合：
    -  Windows：`%USERPROFILE%\.cursor\mcp.json` に配置
    -  macOS：`~/.cursor/mcp.json` に配置

3. 設定後、Cursorを再起動すると、Agentが自動的にBacklogツールを使用できるようになります。

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

## 開発
> このセクションは、このプロジェクトの開発を行う開発者向けの情報です。  
> プロジェクトを利用するだけの場合、このセクションの手順は不要です。

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

### 参考
- [Backlog API](https://developer.nulab.com/ja/docs/backlog/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cursor MCP設定](https://docs.cursor.com/context/model-context-protocol)