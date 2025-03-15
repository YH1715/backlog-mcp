// 課題関連の型定義
export interface Issue {
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  issueType: {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
  };
  summary: string;
  description: string;
  resolution: {
    id: number;
    name: string;
  } | null;
  priority: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
  };
  assignee: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  } | null;
  category: {
    id: number;
    name: string;
    displayOrder: number;
  }[];
  versions: {
    id: number;
    projectId: number;
    name: string;
    description: string;
    startDate: string | null;
    releaseDueDate: string | null;
    archived: boolean;
    displayOrder: number;
  }[];
  milestone: {
    id: number;
    projectId: number;
    name: string;
    description: string;
    startDate: string | null;
    releaseDueDate: string | null;
    archived: boolean;
    displayOrder: number;
  }[];
  startDate: string | null;
  dueDate: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  parentIssueId: number | null;
  createdUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
  created: string;
  updatedUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
  updated: string;
  customFields: any[];
  attachments: Attachment[];
}

export interface Attachment {
  id: number;
  name: string;
  size: number;
  created: string;
  createdUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
}

export interface Comment {
  id: number;
  content: string;
  changeLog: any[];
  createdUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
  created: string;
  updated: string;
  stars: any[];
  notifications: any[];
}

// Wiki関連の型定義
export interface WikiPage {
  id: number;
  projectId: number;
  name: string;
  content: string;
  tags: string[];
  attachments: Attachment[];
  sharedFiles: any[];
  stars: any[];
  createdUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
  created: string;
  updatedUser: {
    id: number;
    userId: string;
    name: string;
    roleType: number;
    lang: string;
    mailAddress: string;
  };
  updated: string;
}

// パラメータの型定義
export interface IssueListParams {
  projectId?: number | string;
  statusId?: number[];
  assigneeId?: number[];
  categoryId?: number[];
  versionId?: number[];
  milestoneId?: number[];
  priorityId?: number[];
  issueTypeId?: number[];
  keyword?: string;
  createdUserId?: number[];
  resolutionId?: number[];
  parentIssueId?: number[];
  sort?: string;
  order?: 'asc' | 'desc';
  offset?: number;
  count?: number;
  createdSince?: string;
  createdUntil?: string;
  updatedSince?: string;
  updatedUntil?: string;
  startDateSince?: string;
  startDateUntil?: string;
  dueDateSince?: string;
  dueDateUntil?: string;
  ids?: number[];
  parentChild?: boolean;
  attachment?: boolean;
  sharedFile?: boolean;
}

export interface CommentListParams {
  minId?: number;
  maxId?: number;
  count?: number;
  order?: 'asc' | 'desc';
}

export interface WikiListParams {
  projectIdOrKey?: string | number;
  keyword?: string;
} 