// ============================================================
// 網站設定：上線前只要改這個檔案，全站都會跟著更新
// ============================================================

export const SITE = {
  // TODO：換成你的正式網域（結尾不要加斜線）
  url: 'https://www.ns69.top',
  name: '南山 App',

  // TODO：App Store 的 app-id（數字），用於 iOS Safari 下載橫幅
  appStoreId: '6759705639',
  // TODO：正式下載連結
  appStoreUrl: 'https://apps.apple.com/us/app/%E5%8D%97%E5%B1%B1-nanshan/id6759705639',
  playUrl: 'https://play.google.com/store/apps/details?id=xetyj.glxtmr.afqxd',

  // TODO：App 現有的隱私權政策網址；留空則頁尾不顯示
  privacyUrl: 'https://www.privacypolicies.com/live/4c044389-df55-48cc-9366-a71661fc0fdf',

  // 預設分享圖（放在 public/img/ 裡，1200x630）
  defaultOgImage: '/img/og-image.jpg',
};

// 文章分類：網址會是 /guide/文章名/、/compare/文章名/、/blog/文章名/
// 新增分類：在這裡加一筆即可，導覽列與分類頁會自動產生
export const CATEGORIES = {
  guide: {
    name: 'G軟推薦',
    title: 'G軟推薦｜台灣同志交友 App 指南',
    description: '台灣男同志交友 App 推薦與使用指南，幫你找到適合自己的 G軟。',
    intro: '台灣男同志交友 App 的推薦與使用指南。',
  },
  compare: {
    name: 'App 比較',
    title: '同志交友 App 比較',
    description: 'Grindr、Blued 等同志交友 App 與南山的完整比較。',
    intro: '把常見的同志交友 App 放在一起比，幫你找到最適合的那一款。',
  },
  blog: {
    name: '專欄',
    title: '專欄｜台灣同志生活與活動',
    description: '台灣同志遊行、圈內活動與生活專欄。',
    intro: '台灣同志生活、活動與圈內大小事。',
  },
};
