<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/rss/channel">
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title><xsl:value-of select="title"/> — Hero Studios</title>
<style>
  body{margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;background:#050816;color:#f8fafc;line-height:1.6;padding:48px 20px;-webkit-font-smoothing:antialiased}
  .wrap{max-width:760px;margin:0 auto}
  a{color:#a78bfa;text-decoration:none}
  a:hover{color:#38bdf8}
  h1{font-family:Sora,system-ui,sans-serif;font-size:30px;margin:0 0 6px;letter-spacing:-0.02em}
  .lead{color:#94a3b8;margin:0 0 32px}
  .item{background:linear-gradient(180deg,#1e293b,#111827);border:1px solid #334155;border-radius:14px;padding:18px 20px;margin-bottom:12px}
  .item h3{margin:0 0 6px;font-size:16px;color:#f8fafc}
  .item p{margin:0;color:#cbd5e1;font-size:14px}
  .meta{font-family:ui-monospace,monospace;font-size:12px;color:#64748b;margin-top:8px}
  footer{margin-top:32px;color:#64748b;font-size:13px}
</style>
</head>
<body>
<div class="wrap">
  <h1><xsl:value-of select="title"/></h1>
  <p class="lead"><xsl:value-of select="description"/></p>
  <xsl:for-each select="item">
    <div class="item">
      <h3><a href="{link}"><xsl:value-of select="title"/></a></h3>
      <p><xsl:value-of select="description"/></p>
      <div class="meta">Release · <xsl:value-of select="guid"/></div>
    </div>
  </xsl:for-each>
  <footer>This is an RSS feed — subscribe with your feed reader, or visit herostudios.dev.</footer>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
