import { AnimeForGraph } from "@/models/index"
import fs from "fs"
import { SITE_NAME } from "../constants";

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generateAnimeItem = (anime: AnimeForGraph): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/animes/${anime.mal_id}</loc>
    <title>${escapeString(anime.title_japanese)}</title>
    <lastmod>${new Date(anime.lastUpdateTime._seconds * 1000).toUTCString()}</lastmod>
</url>
    `)
}


const generateSitemap = (animes: AnimeForGraph[]): string => {
  return (`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.HTTPS_URL}</loc>
    <title>${SITE_NAME}</title>
    <lastmod>${new Date().toUTCString()}</lastmod>
</url>
  ${animes.map(generateAnimeItem).join('')}
</urlset>
    `)
}
const publishSitemap = async (animes: AnimeForGraph[]) => {
  const PATH_DEVELOPINNG = './public/ignore/sitemap.xml'
  const PATH = './public/sitemap.xml'
  const sitemap = generateSitemap(animes)
  if (process.env.NODE_ENV == "development") {
    fs.writeFileSync(PATH_DEVELOPINNG, sitemap)
    console.log('Updated sitemap for development: ' + animes.length + ' animes writed')
  }
  else {
    fs.writeFileSync(PATH, sitemap)
    console.log('Updated sitemap for production: ' + animes.length + ' animes writed')
  }
}

export default publishSitemap