export type AppRole = "admin" | "user";
export type ContentStatus = "draft" | "published" | "archived";
export type ContentVisibility = "public" | "private";

export interface UserRoleRecord {
  id: number;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface BlogPostRecord {
  id: string;
  author_user_id: string;
  slug: string;
  title: string;
  summary: string;
  content_md: string;
  tags: string[];
  cover_image_url: string | null;
  canonical_url: string | null;
  reading_time_minutes: number;
  pinned: boolean;
  status: ContentStatus;
  visibility: ContentVisibility;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScrapRecord {
  id: string;
  author_user_id: string;
  slug: string;
  url: string;
  title: string | null;
  source: string;
  one_line_summary: string;
  comment_md: string | null;
  tags: string[];
  scrap_date: string;
  og_title: string | null;
  og_image_url: string | null;
  status: ContentStatus;
  visibility: ContentVisibility;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudioContentRecord {
  id: string;
  contentType: "blog" | "scrap";
  authorUserId: string;
  slug: string;
  title: string;
  previewText: string;
  tags: string[];
  status: ContentStatus;
  visibility: ContentVisibility;
  updatedAt: string;
  createdAt: string;
  publishedAt: string | null;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createFallbackSlug(prefix: "post" | "scrap") {
  return `${prefix}-${Date.now().toString(36)}`;
}

export function parseTags(input: string) {
  return Array.from(
    new Set(
      input
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );
}

export function tagsToInput(tags: string[]) {
  return tags.join(", ");
}

export function estimateReadingTime(content: string) {
  const plainText = content.replace(/[#*_`>\-\n]/g, " ").trim();
  const words = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDisplayDate(value: string | null | undefined) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeDate(value: string) {
  const target = new Date(value).getTime();
  const diffMinutes = Math.round((Date.now() - target) / 60000);

  if (diffMinutes < 1) {
    return "방금 전";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays}일 전`;
  }

  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
