import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 後台（Pages CMS）留空的欄位可能會存成空字串或空物件，這裡統一當作「沒填」
const empty = (v: unknown) =>
  v === '' || v === null || (typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date) && Object.values(v).every((x) => x === '' || x === null || x === undefined || typeof x === 'boolean'));
// 日期時間：YAML 可能自動轉成 Date 物件，統一轉回 ISO 字串
const dateTimeString = z.preprocess((v) => (v instanceof Date ? v.toISOString() : v), z.string());
const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (empty(v) ? undefined : v), schema.optional());
const cleanList = <T extends z.ZodTypeAny>(item: T, key: string) =>
  z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((x) => x && typeof x === 'object' && (x as any)[key]) : []),
    z.array(item),
  );

// 每篇文章 = src/content/posts/ 裡的一個 .md 檔
// 網址由文章開頭的 slug 決定（Astro 會自動讀取，沒填就用檔名），例如 slug: g-app-2026 → /guide/g-app-2026/
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),                         // 頁面大標題（H1）
    seoTitle: optional(z.string()),            // 搜尋結果標題（<title>），不填就用 title
    description: z.string(),                   // 搜尋結果摘要（約 80 字內）
    category: z.enum(['guide', 'compare', 'blog']),
    pubDate: z.coerce.date(),
    updatedDate: optional(z.coerce.date()),
    readingTime: optional(z.string()),         // 例如「6 分鐘」
    disclose: optional(z.string()),            // 文章開頭的說明框
    toc: z.boolean().default(false),           // 是否顯示自動目錄
    ogImage: optional(z.string()),             // 分享圖，例如 /img/xxx.jpg
    faq: cleanList(z.object({ q: z.string(), a: z.string() }), 'q').default([]),
    sources: cleanList(z.object({ title: z.string(), url: z.string().url() }), 'url').default([]),
    cta: optional(z.object({ title: z.string(), text: z.string() })),
    event: optional(
      z.object({
        name: z.string(),
        description: z.string(),
        startDate: dateTimeString,          // 例如 2026-10-31T12:00:00+08:00
        endDate: dateTimeString,
        locationName: z.string(),
        streetAddress: z.string(),
        locality: z.string(),
        region: z.string(),
        organizerName: z.string(),
        organizerUrl: z.string().url(),
        free: z.boolean().default(true),
      }),
    ),
    draft: z.boolean().default(false),         // true = 不會發布
  }),
});

export const collections = { posts };
