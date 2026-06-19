export interface TutorialDetail {
  id: number;
  tutorial_id: number;
  created_on: string;
  created_by: string;
}

export interface TutorialListItem {
  id: number;
  title: string;
  description: string;
  published: boolean;
}

export interface Tutorial extends TutorialListItem {
  detail: TutorialDetail | null;
}

export interface TutorialCreatePayload {
  title: string;
  description: string;
  published: boolean;
  detail: {
    created_by: string;
  };
}

export interface TutorialUpdatePayload {
  title?: string;
  description?: string;
  published?: boolean;
}

export interface TutorialDetailUpdatePayload {
  created_by?: string;
}

export interface ApiValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}
