// Drowsebook (入梦书) — site i18n + poster locale routing
// Self-contained, no framework. Each visible text node has data-i18n="key"
// (or data-i18n-html when HTML is allowed). The applyLang() function swaps
// every node + the carousel's poster set when the user picks a language.

(function () {
  const SUPPORTED = ['zh-Hans', 'zh-Hant', 'en', 'ja'];
  const POSTER_LANGS = ['zh-Hans', 'zh-Hant', 'en', 'ja'];
  const STORAGE_KEY = 'drowsebook.lang';

  const slides = [
    '01-read-anywhere',
    '02-listen-tts',
    '03-smart-pdf',
    '04-themed-reader',
    '05-bookshelf',
  ];

  // ------------------------------------------------------------------
  // Translations
  // Each language carries a flat object of keys. Missing keys fall back
  // to English, then zh-Hans, so partial coverage is fine.
  // ------------------------------------------------------------------
  const dict = {
    'zh-Hans': {
      htmlLang: 'zh-Hans',
      'page.title': '入梦书 Drowsebook — 睡前听书 · 氛围伴读',
      'nav.features': '功能',
      'nav.screenshots': '截图',
      'nav.privacy': '隐私',
      'nav.github': 'GitHub',
      'hero.title.l1': '睡前听书，氛围伴读',
      'hero.lede': '入梦书 是为睡前听书而生的 iPhone 应用。用 Apple 系统语音朗读你自己的书，雨声、火炉、海浪、自然环境音相伴入眠。',
      'hero.cta.coming': '即将上架 App Store',
      'hero.cta.github': '在 GitHub 上查看',
      'hero.meta.iphone': 'iPhone（iPad 通用待发布）',
      'hero.meta.ios': 'iOS 17 +',
      'hero.meta.noads': '无广告',
      'hero.meta.local': '本地存储',
      'carousel.prev': '上一张',
      'carousel.next': '下一张',
      'stat.formats': '种书籍格式',
      'stat.langs': '种界面语言',
      'stat.tracking': '追踪 · 数据上传',
      'feat.eyebrow': '功能',
      'feat.title': '为一段安静的睡前阅读而设计',
      'feat.lede': '所有功能围绕"睡前听书 · 氛围伴读"展开。没有打卡、没有徽章、没有干扰。',
      'feat.1.title': '睡前听书 · 系统语音',
      'feat.1.body': '调用 Apple 系统中文 / 日文 / 英文语音朗读；定时关闭（含淡出），AirPods 双击 ±15 秒；阅读位置与朗读位置实时同步。',
      'feat.2.title': '睡前背景音 · 氛围伴读',
      'feat.2.body': '雨声、火炉、海浪、森林、自然环境音可与朗读自由叠加，做你入睡前最轻的伴读。',
      'feat.3.title': '本地阅读 · 五种格式',
      'feat.3.body': '原生支持 EPUB / PDF / TXT / MOBI / AZW3，仅限无 DRM 的文件。从 文件 / iCloud Drive / Safari 直接导入，全部存放在 App 沙盒中。',
      'feat.4.title': '智能 PDF',
      'feat.4.body': '启发式过滤页码、脚注、页眉页脚，让朗读不再被"第 23 页"打断。可逐段开关。',
      'feat.5.title': '书签 · 自动续读 · 章节大纲',
      'feat.5.body': '退出即记住进度，下次原位继续；任意位置加书签，章节目录随时跳转。',
      'feat.6.title': '私密设计',
      'feat.6.body': '无注册、无服务器、无第三方追踪 SDK。书本内容不上传 iCloud；阅读位置同步可选并默认关闭，启用时由 Apple 端到端加密。',
      'lang.label': '支持的界面语言',
      'priv.eyebrow': '隐私',
      'priv.title': '我们不知道你在读什么',
      'priv.body': '入梦书 不收集任何个人信息。没有账号、没有分析 SDK、没有第三方追踪。所有书籍、书签、阅读位置都只保存在你的设备上。可选的阅读位置同步使用你私人 iCloud 账户的私有数据库，由 Apple 端到端加密。',
      'priv.links': '完整版本：',
      'priv.link.privacy': '隐私政策',
      'priv.link.terms': '服务条款',
      'cta.title': '开始一段安静的阅读',
      'cta.body': '入梦书 即将上架 App Store。可以先在 GitHub 标星或写信留个联系方式，上架时第一时间通知你。',
      'foot.app': '应用',
      'foot.legal': '法律',
      'foot.links': '链接',
      'foot.repo': 'GitHub',
      'foot.feedback': '反馈与建议',
      'foot.contact': '联系',
      'foot.tagline': '睡前听书 · 氛围伴读',
      'foot.copyright': '© 2026 Drowsebook · 由 hooosberg 制作',
      'foot.fontnote': '随附 3 本公有领域示范书：沉思录 / 銀河鉄道の夜 / Alice',
    },

    'zh-Hant': {
      htmlLang: 'zh-Hant',
      'page.title': '入夢書 Drowsebook — 睡前聽書 · 氛圍伴讀',
      'nav.features': '功能', 'nav.screenshots': '截圖', 'nav.privacy': '隱私', 'nav.github': 'GitHub',
      'hero.title.l1': '睡前聽書，氛圍伴讀',
      'hero.lede': '入夢書 是為睡前聽書而生的 iPhone 應用。用 Apple 系統語音朗讀你自己的書,雨聲、火爐、海浪、自然環境音相伴入眠。',
      'hero.cta.coming': '即將上架 App Store', 'hero.cta.github': '在 GitHub 上查看',
      'hero.meta.iphone': 'iPhone（iPad 通用版待發佈）', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.noads': '無廣告', 'hero.meta.local': '本地儲存',
      'carousel.prev': '上一張', 'carousel.next': '下一張',
      'stat.formats': '種書籍格式', 'stat.langs': '種介面語言', 'stat.tracking': '追蹤 · 資料上傳',
      'feat.eyebrow': '功能', 'feat.title': '為一段安靜的睡前閱讀而設計',
      'feat.lede': '所有功能圍繞「睡前聽書 · 氛圍伴讀」展開。沒有打卡、沒有徽章、沒有干擾。',
      'feat.1.title': '睡前聽書 · 系統語音',
      'feat.1.body': '呼叫 Apple 系統中文 / 日文 / 英文語音朗讀；定時關閉（含淡出），AirPods 雙擊 ±15 秒；閱讀位置與朗讀位置即時同步。',
      'feat.2.title': '睡前背景音 · 氛圍伴讀',
      'feat.2.body': '雨聲、火爐、海浪、森林、自然環境音可與朗讀自由疊加，做你入睡前最輕的伴讀。',
      'feat.3.title': '本地閱讀 · 五種格式',
      'feat.3.body': '原生支援 EPUB / PDF / TXT / MOBI / AZW3，僅限無 DRM 的檔案。從 檔案 / iCloud Drive / Safari 直接匯入，全部存放在 App 沙盒中。',
      'feat.4.title': '智慧 PDF',
      'feat.4.body': '啟發式過濾頁碼、註腳、頁眉頁尾，讓朗讀不再被「第 23 頁」打斷。可逐段開關。',
      'feat.5.title': '書籤 · 自動續讀 · 章節大綱',
      'feat.5.body': '退出即記住進度，下次原位繼續；任意位置加書籤，章節目錄隨時跳轉。',
      'feat.6.title': '私密設計',
      'feat.6.body': '無註冊、無伺服器、無第三方追蹤 SDK。書本內容不上傳 iCloud；閱讀位置同步可選且預設關閉，啟用時由 Apple 端對端加密。',
      'lang.label': '支援的介面語言',
      'priv.eyebrow': '隱私', 'priv.title': '我們不知道你在讀什麼',
      'priv.body': '入夢書 不收集任何個人資訊。沒有帳號、沒有分析 SDK、沒有第三方追蹤。所有書籍、書籤、閱讀位置都只保存在你的裝置上。可選的閱讀位置同步使用你私人 iCloud 帳戶的私有資料庫，由 Apple 端對端加密。',
      'priv.links': '完整版本：', 'priv.link.privacy': '隱私政策', 'priv.link.terms': '服務條款',
      'cta.title': '開始一段安靜的閱讀',
      'cta.body': '入夢書 即將上架 App Store。可先在 GitHub 加星或寫信留個聯絡方式,上架時第一時間通知你。',
      'foot.app': '應用', 'foot.legal': '法律', 'foot.links': '連結', 'foot.repo': 'GitHub', 'foot.feedback': '回饋與建議', 'foot.contact': '聯絡',
      'foot.tagline': '睡前聽書 · 氛圍伴讀',
      'foot.copyright': '© 2026 Drowsebook · 由 hooosberg 製作',
      'foot.fontnote': '隨附 3 本公有領域示範書：沉思錄 / 銀河鉄道の夜 / Alice',
    },

    'en': {
      htmlLang: 'en',
      'page.title': 'Drowsebook — Bedtime listening with soft soundscapes',
      'nav.features': 'Features', 'nav.screenshots': 'Screens', 'nav.privacy': 'Privacy', 'nav.github': 'GitHub',
      'hero.title.l1': 'Bedtime listening, soft soundscapes.',
      'hero.lede': 'Drowsebook is an iPhone app made for bedtime listening. Apple system voices read your own books, with rain, fireplace, ocean, and nature soundscapes drifting underneath.',
      'hero.cta.coming': 'Coming soon to the App Store', 'hero.cta.github': 'View on GitHub',
      'hero.meta.iphone': 'iPhone (universal coming)', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.noads': 'No ads', 'hero.meta.local': 'On-device only',
      'carousel.prev': 'Previous', 'carousel.next': 'Next',
      'stat.formats': 'book formats', 'stat.langs': 'UI languages', 'stat.tracking': 'trackers · 0 uploads',
      'feat.eyebrow': 'Features', 'feat.title': 'Built for the quiet hour before sleep',
      'feat.lede': 'Every feature is shaped around bedtime listening with soft soundscapes. No streaks, no badges, no nudges.',
      'feat.1.title': 'Bedtime listening with system voices',
      'feat.1.body': 'Uses Apple\'s built-in voices in Chinese, Japanese, and English. Sleep timer with fade-out, AirPods double-tap ±15s skip, and reading position stays in sync with the spoken position.',
      'feat.2.title': 'Soundscapes for drifting off',
      'feat.2.body': 'Layer rain, fireplace, ocean, forest, and nature ambience under the narration — a soft companion as you fall asleep. Adjustable volume, independent of the voice track.',
      'feat.3.title': 'Read 5 local formats',
      'feat.3.body': 'Native support for EPUB, PDF, TXT, MOBI, AZW3 — DRM-free files only. Import from Files, iCloud Drive, or Safari; everything lives in the app sandbox.',
      'feat.4.title': 'Smart PDF filtering',
      'feat.4.body': 'Heuristics filter out page numbers, footnotes, and running headers so listening doesn\'t get interrupted by "page 23". Toggle per-passage.',
      'feat.5.title': 'Bookmarks · auto-resume · outline',
      'feat.5.body': 'Quit any time, resume exactly where you left off. Bookmark anywhere, jump via chapter outline.',
      'feat.6.title': 'Private by design',
      'feat.6.body': 'No sign-up, no server, no third-party tracking SDKs. Book content is never uploaded to iCloud; reading-position sync is optional and off by default, end-to-end encrypted when enabled.',
      'lang.label': 'UI languages',
      'priv.eyebrow': 'Privacy', 'priv.title': "We don't know what you're reading",
      'priv.body': 'Drowsebook collects nothing. No account, no analytics SDK, no third-party tracking. Books, bookmarks, and reading positions live only on your device. Optional reading-position sync uses Apple\'s private CloudKit database — end-to-end encrypted, unreadable by us.',
      'priv.links': 'Full text:', 'priv.link.privacy': 'Privacy Policy', 'priv.link.terms': 'Terms of Service',
      'cta.title': 'Begin a quiet read',
      'cta.body': 'Drowsebook is coming soon to the App Store. Star the GitHub repo or write to us — we\'ll let you know the moment it goes live.',
      'foot.app': 'App', 'foot.legal': 'Legal', 'foot.links': 'Links', 'foot.repo': 'GitHub', 'foot.feedback': 'Feedback', 'foot.contact': 'Contact',
      'foot.tagline': 'Bedtime listening with soft soundscapes',
      'foot.copyright': '© 2026 Drowsebook · Built by hooosberg',
      'foot.fontnote': 'Bundles 3 public-domain sample books: Meditations / 銀河鉄道の夜 / Alice',
    },

    'ja': {
      htmlLang: 'ja',
      'page.title': 'ドラウズブック Drowsebook — 寝る前の読み上げと環境音',
      'nav.features': '機能', 'nav.screenshots': '画面', 'nav.privacy': 'プライバシー', 'nav.github': 'GitHub',
      'hero.title.l1': '寝る前の読み上げと、やさしい環境音。',
      'hero.lede': '入夢書 は寝る前の読み上げのための iPhone アプリ。Apple のシステム音声であなたの本を読み上げ、雨・暖炉・波・自然の環境音が眠りへ誘います。',
      'hero.cta.coming': 'まもなく App Store にて配信', 'hero.cta.github': 'GitHub で見る',
      'hero.meta.iphone': 'iPhone（iPad ユニバーサル版予定）', 'hero.meta.ios': 'iOS 17 +', 'hero.meta.noads': '広告なし', 'hero.meta.local': '端末内保存',
      'carousel.prev': '前へ', 'carousel.next': '次へ',
      'stat.formats': '対応書式', 'stat.langs': 'UI 言語', 'stat.tracking': '追跡 · 0 件',
      'feat.eyebrow': '機能', 'feat.title': '眠りに落ちる前の静かな時間のために',
      'feat.lede': 'すべての機能は「寝る前の読み上げ × やさしい環境音」を中心に設計されています。連続日数も、バッジも、通知の追い立てもありません。',
      'feat.1.title': 'システム音声で寝る前の読み上げ',
      'feat.1.body': 'Apple 内蔵の日本語 / 中国語 / 英語音声を使用。スリープタイマー（フェードアウト付き）、AirPods のダブルタップで ±15 秒スキップ、読み上げ位置と読書位置がリアルタイム同期。',
      'feat.2.title': '寝つき用の環境音',
      'feat.2.body': '雨・暖炉・波・森・自然環境音を読み上げに重ねて。眠りに落ちる前の、やさしい伴奏。音量は音声と独立で調整できます。',
      'feat.3.title': 'ローカルで 5 つの書式に対応',
      'feat.3.body': 'EPUB / PDF / TXT / MOBI / AZW3（DRM のないファイルのみ）にネイティブ対応。ファイル / iCloud Drive / Safari から取り込み、すべて App サンドボックスに保存。',
      'feat.4.title': 'スマート PDF フィルタ',
      'feat.4.body': 'ページ番号・脚注・ヘッダーフッターを発見的に取り除き、「23 ページ」のような読み上げの中断を防ぎます。段落ごとに切替可能。',
      'feat.5.title': 'しおり · 自動再開 · 目次',
      'feat.5.body': 'いつ終了しても、次回はぴったり同じ位置から。任意の位置でしおりを付け、章目次から自由に移動。',
      'feat.6.title': 'プライバシー重視の設計',
      'feat.6.body': 'アカウントもサーバーも第三者 SDK もありません。書籍の内容は iCloud にアップロードされません。読書位置の同期はオプションで既定オフ、有効時は Apple のエンドツーエンド暗号化。',
      'lang.label': '対応 UI 言語',
      'priv.eyebrow': 'プライバシー', 'priv.title': 'あなたが何を読んでいるか、私たちは知りません',
      'priv.body': 'ドラウズブック は個人情報を一切収集しません。アカウントなし、解析 SDK なし、第三者追跡なし。本・しおり・読書位置はすべて端末に保存されます。任意の読書位置同期はあなた自身の iCloud 私的データベースを使い、Apple のエンドツーエンド暗号化により開発者からも読めません。',
      'priv.links': '全文：', 'priv.link.privacy': 'プライバシーポリシー', 'priv.link.terms': '利用規約',
      'cta.title': '静かな読書を始める',
      'cta.body': 'ドラウズブック はまもなく App Store で配信予定。GitHub でスターを付けるか、メールでご連絡いただければ、配信開始のタイミングをお知らせします。',
      'foot.app': 'アプリ', 'foot.legal': '法的', 'foot.links': 'リンク', 'foot.repo': 'GitHub', 'foot.feedback': 'フィードバック', 'foot.contact': 'お問い合わせ',
      'foot.tagline': '寝る前の読み上げと環境音',
      'foot.copyright': '© 2026 Drowsebook · hooosberg 制作',
      'foot.fontnote': 'パブリックドメインの見本書 3 冊を同梱：自省録 / 銀河鉄道の夜 / Alice',
    },
  };

  // Native names of each supported language, used in both the dropdown list
  // and the trigger button. Native script keeps the menu legible to people
  // who don't read the current UI language.
  const langDisplayNames = {
    'zh-Hans': '简体中文',
    'zh-Hant': '繁體中文',
    'en':      'English',
    'ja':      '日本語',
  };

  // ------------------------------------------------------------------
  // Detection: storage > URL hash > navigator.languages > en
  // ------------------------------------------------------------------
  function detectLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) {}

    const hash = (location.hash || '').replace('#lang=', '');
    if (SUPPORTED.includes(hash)) return hash;

    const navList = navigator.languages || [navigator.language || 'en'];
    for (const raw of navList) {
      if (!raw) continue;
      const lower = raw.toLowerCase();
      if (lower.startsWith('zh')) {
        if (lower.includes('hant') || lower.includes('tw') || lower.includes('hk') || lower.includes('mo')) {
          return 'zh-Hant';
        }
        return 'zh-Hans';
      }
      const base = lower.split('-')[0];
      const map = {
        en: 'en', ja: 'ja',
      };
      if (map[base]) return map[base];
    }
    return 'en';
  }

  function t(lang, key) {
    const node = (dict[lang] && dict[lang][key]) || dict['en'][key] || dict['zh-Hans'][key] || key;
    return node;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    document.documentElement.lang = dict[lang].htmlLang || lang;
    document.title = t(lang, 'page.title');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(lang, key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(lang, key);
    });

    // Dropdown trigger label + active item
    const triggerLabel = document.querySelector('[data-lang-current]');
    if (triggerLabel) triggerLabel.textContent = langDisplayNames[lang];
    document.querySelectorAll('[data-lang-pill]').forEach((el) => {
      el.classList.toggle('active', el.getAttribute('data-lang-pill') === lang);
    });

    // Hero poster row — swap to language-specific posters (placeholder for now)
    swapHeroPosters(lang);

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function swapHeroPosters(lang) {
    // Real per-locale posters live under ./posters/<lang>/<slide>.png.
    // `data-poster-img` attribute holds the slide stem (e.g. "01-home").
    // If a poster is missing for some locale we fall back to the English set,
    // and beyond that to the app icon, so the page never renders broken images.
    const supported = ['zh-Hans', 'zh-Hant', 'ja', 'en'];
    const folder = supported.includes(lang) ? lang : 'en';
    document.querySelectorAll('[data-poster-img]').forEach((img) => {
      const slide = img.getAttribute('data-poster-img') || '';
      img.src = `./posters/${folder}/${slide}.png`;
      img.onerror = () => {
        img.onerror = null;
        img.src = './icons/app-icon-rounded-512.png';
      };
    });
  }

  // ------------------------------------------------------------------
  // Lang dropdown — auto-picks browser language on first visit, persists
  // user choice afterwards in localStorage.
  // ------------------------------------------------------------------
  function buildLangSwitcher() {
    const host = document.querySelector('[data-lang-switcher]');
    if (!host) return;

    const trigger = document.createElement('button');
    trigger.className = 'lang-dropdown-trigger';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span data-lang-current>English</span>
      <span class="caret">▾</span>
    `;

    const menu = document.createElement('div');
    menu.className = 'lang-dropdown-menu';
    menu.setAttribute('role', 'menu');

    SUPPORTED.forEach((lang) => {
      const item = document.createElement('button');
      item.className = 'lang-dropdown-item';
      item.setAttribute('data-lang-pill', lang);
      item.setAttribute('role', 'menuitem');
      item.textContent = langDisplayNames[lang];
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        applyLang(lang);
        closeMenu();
      });
      menu.appendChild(item);
    });

    function openMenu()  { menu.classList.add('open');    trigger.setAttribute('aria-expanded', 'true'); }
    function closeMenu() { menu.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
    function toggleMenu(){ menu.classList.contains('open') ? closeMenu() : openMenu(); }

    trigger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    document.addEventListener('click', (e) => {
      if (!host.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    host.appendChild(trigger);
    host.appendChild(menu);
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  function boot() {
    buildLangSwitcher();
    applyLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
