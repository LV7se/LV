// 品牌图标：直接以 SVG 代码维护，不依赖外部文件
// 图形本身跟随系统配色，站点深浅色由 logo.css 统一纠正
export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg"
     width="2500" height="2500"
     viewBox="0 0 192.756 192.756"
     role="img" aria-label="Logo">
  <style>
    .logo-mark { fill: #202124; }
    @media (prefers-color-scheme: dark) {
      .logo-mark { fill: #f1f3f4; }
    }
  </style>
  <g transform="translate(-8.1 15.8)">
    <path class="logo-mark" fill-rule="evenodd" clip-rule="evenodd"
      d="M143.85 22.377l-40.162 94.791-11.08-24.313 20.466-55.705c1.539-4.308 6.924-6.309 16.004-6.309l3.23-8.464H84.606l-3.078 8.464c6.771 0 9.541 2 8.463 6.309L79.836 65.464 59.832 22.377c-3.693-4.616-1.847-6.925 5.386-6.925V5.451H19.053v10.002c8.618 0 14.003 2.309 16.312 6.925l33.854 72.017-15.85 42.317c-.309 5.693-9.233 8.465-26.468 8.465l-3.231 8.463h131.721l18.312-38.932h-9.541c-8.924 20.158-19.234 30.469-30.775 30.469H72.911l8.925-23.852 7.694 15.387h17.235L155.39 22.379c2.309-6.925 8.311-10.617 17.697-10.617V2.834h-39.701v8.926c12.003 0 15.389 3.693 10.464 10.617z"/>
  </g>
</svg>`

// 供 <link rel="icon"> 与 <img src> 使用，由上面的代码生成
export const LOGO_DATA_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`
