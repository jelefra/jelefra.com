export const html = (reactDom, helmetData) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${helmetData.title.toString()}
  ${helmetData.meta.toString()}
  <link rel="stylesheet" href="/main.css" />
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/favicon.ico">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body>
  <div id="root">${reactDom}</div>
  <script src="/main.js"></script>
</body>
</html>`;
