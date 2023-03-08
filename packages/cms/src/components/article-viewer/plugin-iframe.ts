import type { BytemdPlugin } from 'bytemd';

function bv2av(bvid: string) {
  const tr = {},
    s = [11, 10, 3, 8, 4, 6],
    xor = 177451812,
    add = 8728348608,
    table = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF"

  for (let i = 0; i < 58; i++) {
    tr[table[i]] = i;
  }

  let r = 0;
  for (let i = 0; i < 6; i++) {
    r += tr[bvid[s[i]]] * 58 ** i;
  }
  return (r - add) ^ xor;
}

export default function pluginIframe(): BytemdPlugin {
  return {
    viewerEffect() {
      const links = document.querySelectorAll('a')
      links.forEach(link => {
        if (link.href.startsWith('https://www.bilibili.com/video/')) {
          const bvid = link.href.split('https://www.bilibili.com/video/')[1].slice(0)
          const aid = bv2av(bvid)
          console.log(`//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}`);
          
          const video = document.createElement('iframe')
          video.src = `//player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}`
          video.style.overflow = 'hidden'
          video.style.borderWidth = '0'
          video.allowFullscreen = true
          video.style.width = '100%'
          video.style.height = '500px' /* 100/56.25 = 560/315 = 1.778 */
          link.replaceWith(video)
        }
      })
    }
  };
}
