// オフラインでも開けるようにする（アプリ本体だけを保存。お客様データはiPad内のみ）
const CACHE = 'salon-techo-v3';
const FILES = ['./', './index.html', './manifest.json', './icon-180.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// ネットにつながれば最新版、つながらなければ保存版
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  // 自分のファイルとFirebaseの部品だけ保存。同期の通信には触れない
  if (u.origin !== location.origin && !u.href.startsWith('https://www.gstatic.com/firebasejs/')) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
