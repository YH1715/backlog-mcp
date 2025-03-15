import axios from 'axios';
import dotenv from 'dotenv';
import type { 
  Issue, 
  Attachment, 
  Comment, 
  WikiPage, 
  IssueListParams, 
  CommentListParams, 
  WikiListParams 
} from './types';

dotenv.config();

export class BacklogClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    const spaceId = process.env.BACKLOG_SPACE_ID;
    this.apiKey = process.env.BACKLOG_API_KEY || '';
    this.baseUrl = `https://${spaceId}.backlog.com/api/v2`;
  }

  private async request<T>(method: string, path: string, params?: any): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const queryParams = { apiKey: this.apiKey, ...params };

    try {
      const response = await axios({
        method,
        url,
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Backlog API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  // 課題一覧の取得
  async getIssues(params?: IssueListParams): Promise<Issue[]> {
    return this.request<Issue[]>('GET', '/issues', params);
  }

  // 課題の詳細取得
  async getIssue(issueIdOrKey: string): Promise<Issue> {
    return this.request<Issue>('GET', `/issues/${issueIdOrKey}`);
  }

  // 課題コメントの取得
  async getIssueComments(issueIdOrKey: string, params?: CommentListParams): Promise<Comment[]> {
    return this.request<Comment[]>('GET', `/issues/${issueIdOrKey}/comments`, params);
  }

  // 課題の添付ファイルのダウンロード
  async getIssueAttachment(issueIdOrKey: string, attachmentId: string): Promise<Attachment> {
    return this.request<Attachment>('GET', `/issues/${issueIdOrKey}/attachments/${attachmentId}`);
  }

  // Wikiページ一覧の取得
  async getWikiPages(params?: WikiListParams): Promise<WikiPage[]> {
    return this.request<WikiPage[]>('GET', '/wikis', params);
  }

  // Wikiページの詳細取得
  async getWikiPage(wikiId: number): Promise<WikiPage> {
    return this.request<WikiPage>('GET', `/wikis/${wikiId}`);
  }

  // Wiki添付ファイル一覧の取得
  async getWikiAttachments(wikiId: number): Promise<Attachment[]> {
    return this.request<Attachment[]>('GET', `/wikis/${wikiId}/attachments`);
  }

  // Wiki添付ファイルのダウンロード
  async getWikiAttachment(wikiId: number, attachmentId: number): Promise<Attachment> {
    return this.request<Attachment>('GET', `/wikis/${wikiId}/attachments/${attachmentId}`);
  }
} 