require('dotenv').config()

import { Anime } from '../models/Anime'
import TranslateTitle from '../lib/translate-title'

const graphSize = 10

const date = new Date()
const yobi = date.getDay()
let mode: string = 'oyasumi'

const calendarJson = {
  table: {
    headers: ["月", "火", "水", "木", "金", "土", "日"],
    rows: [["評価", "人気", "映画", "評価", "人気", "映画", "期待"]]
  }
}



if (yobi == 1 || yobi == 4) {
  mode = 'score'
}
if (yobi == 3 || yobi == 6) {
  mode = 'movie'
}
if (yobi == 2 || yobi == 5) {
  mode = 'bypopularity'
}
if (yobi == 0) {
  mode = 'upcoming'
}

console.log('Mode set: ' + mode)

const fetch = require('node-fetch')
const json2md = require('json2md')
const myPackage = require('../../package.json')

// Using Jikan API https://jikan.docs.apiary.io/
function convertAnime(anime: Anime) {
  const jaTitle = TranslateTitle(anime.title)

  if (anime.rank > graphSize) {
    // ランキング11以降は画像省略
    anime.image_url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAATCAQAAADSBVAVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAHdElNRQflARsCNDCuUs6KAAADA0lEQVRIx+3WXWiWdRgG8N/rO10fQnaiUiJFsYNYJkkkWdCi0Kwj2exrRKGHUlhSgScR9mGtUFonEqF5EJRB0bJErFWLEb7soIVNO0iizQ2Z+9Ztut0d7Nn7TRYmL8Gu5+Dl+b/X9X+ui/u+/8/DHOZQYaRt1WHYsE7bLay0nYsghEUXIy3wjRBGnBZCmysq7fvSQ70m9FkrhQeNCk9X2velhlqgX2jM3q/3sCVghcMGjDvhGbwkstc4SHnWMeP+9I6rC/Z8yFEjhrR7AC3CC+B2oUe6RFkl9HrFgPYy7EIfs6EW+114C+PCUjAqLINbhXBtSdhq3cIXPjIprFKvRYsWE8JxsFsYc0Sf8IN0VnmzSb3e0OyCCcvVCxnwqtBURlklTDurVVMJu9jHTKil2oV9UuVD1QnnpUBvUok2LNRoE/hMeCIxvF0YdAtuMG3SCixyUng0r06hw92q1FmlOumFG9El3FZGWSWyzyhml/oI4WvhoCrKh6pNkkOrX5xKQrHIZh86IUSybYNpF6wFjws/JjHeFpqzoa7xmxDGfGUDaBZeVCv8XFY5E2p5slbILvUxOwSfJPxcqLGZUPN0OY16cK9aOxPqdX61x2J7HME07rBPylaHks7OIVVwP+RO23wrZZ1PPYK9aFCP/X+jHEp+C9mlPuC4HvXWZPdJI6U6t/HLwqAN0ljtaFKpLcIB8KXwlGV6hF15kxMFTdSQ/WeN1zVivveF3aBT6Dbl+rLKmUrl3o/57GIfM5WqsUn4SQpnhNVYKWbbj/kOCuGsfiFM2ZZMximP2WFK2OJzIXTIyMiowQd5496ad1Dc5bxz3rNTj7AOPC+EwwmjWFkcKp9d7GP29EvrTGbskHDSXn25mYJ5NmvT75wuu9Qkqzv0GfadN4WPteYd6WEl0p5zzIRuTa6Sj/u1GjAiY2OyssSU8GS2WQqVxaEK2YU+cu+p9cIfrnST743rslEmP9TlR50w+o8/wP4duyK4zwFnhHcvA7tiuMeIQfuLWvS/Yc/hf42/AFgard2EQXq2AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTI3VDAyOjUyOjQ3KzAwOjAwsYATmAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0yN1QwMjo1Mjo0NyswMDowMMDdqyQAAAATdEVYdGxhYmVsAEdhem8gc3lvcnlha3WbKr9DAAAAAElFTkSuQmCC'
  }
  return {
    rank: anime.rank,
    url: anime.url,
    title: jaTitle,
    score: anime.score,
    start_date: anime.start_date,
    image_url: anime.image_url,
    members: anime.members
  }
}

const convertToMd = (anime: Anime) => {
  let heading: string
  let ulArray: string[] = ['']
  if (mode == 'bypopularity') {
    heading = ' (' + anime.members.toLocaleString('ja-JP') + '人視聴)'
    ulArray = [
      'スコア: **' + anime.score + '**',
      '放送・公開開始時期: ' + anime.start_date,
    ]
  } if (mode == 'upcoming') {
    heading = ' (' + anime.members.toLocaleString('ja-JP') + '人視聴予定)'
    ulArray = [
      '放送・公開開始時期: ' + anime.start_date,
    ]
  } else {
    heading = ' (スコア: ' + anime.score + ')'
    ulArray = [
      '視聴者数: **' + anime.members.toLocaleString('ja-JP') + '人**',
      '放送・公開開始時期: ' + anime.start_date,
    ]
  }

  return [
    { h2: anime.rank + '. ' + anime.title + heading },
    { link: { title: 'MyAnimeListで詳細を見る', source: anime.url } },
    { img: { title: 'MyAnimeListのサムネ', source: anime.image_url } },
    {
      ul: ulArray
    },
    { p: '' },
  ]
}

// Post anime ranking to my blog
async function GetMalRanking(graphSize: number) {

  let subtype: string = ''
  if (mode == 'bypopularity') {
    subtype = 'bypopularity'
  } if (mode == 'movie') {
    subtype = 'movie'
  } if (mode == 'upcoming') {
    subtype = 'upcoming'
  } if (mode == 'score') {
    subtype = ''
  }

  const res = await fetch('https://api.jikan.moe/v3/top/anime/1/' + subtype)
  const data = await res.json()
  const topAnimes = data.top.map((anime: Anime) => convertAnime(anime))

  const firstAnime = {
    title: topAnimes[0].title,
    members: topAnimes[0].members,
    score: topAnimes[0].score
  }

  // convert to md or html
  const now = new Date().toLocaleTimeString("ja-Jp")
  const today = new Date().toLocaleDateString("ja-JP")

  const convertToGraphHtml = (anime: Anime) => {
    let relativeWidth: number, rightNumber: number
    if (mode == 'bypopularity' || mode == 'upcoming') {
      relativeWidth = (anime.members - topAnimes[10].members) / (firstAnime.members - topAnimes[10].members)
      rightNumber = anime.members
    } else {
      relativeWidth = (anime.score - topAnimes[10].score) / (firstAnime.score - topAnimes[10].score)
      rightNumber = anime.score
    }
    return '<div class="graphBox"><div style="width: ' + relativeWidth * 100 + '%;" class="title">' + anime.rank + '. ' + anime.title + '</div><div class="rightnumber">' + rightNumber + '</div></div>'
  }

  const convertToTableRow = (anime: Anime) => {
    let tableNumber: number
    if (mode == 'bypopularity' || mode == 'upcoming') {
      tableNumber = anime.members
    } else {
      tableNumber = anime.score
    }
    return `| ${anime.title} | ${tableNumber} |\n`
  }

  const graphHtml = topAnimes.slice(0, graphSize).map((anime: Anime) => convertToGraphHtml(anime)).join('')
  const dataJson = topAnimes.map((anime: Anime) => convertToMd(anime))

  const tableMd = '\n## Excel処理用データ\n\n| タイトル | カウント |\n| :--- | ---: |\n' + topAnimes.map((anime: Anime) => convertToTableRow(anime)).join('') + '\n\n'

  const calendarMd = json2md(calendarJson) + '\n\n'

  // https://blog.uchiten.info/entry/2017/01/30/174500
  const style = `<span></span><style>.graphBox{font-size:0.8em;width:100%;display:flex;padding:.3em;margin:0 0 .2em;position:relative}.graphBox>.title{overflow:visible;white-space:nowrap;background:#add8e6;font-weight:700;padding:.3em}.graphBox>.rightnumber{font-weight:bold;color:gray;position:absolute;right:.3em;padding:.3em}</style></span>\n\n`

  const graphMd = `\n\n## Top` + graphSize + ` (` + today + `, ` + now + `)\n\n` + graphHtml + `\n\n差をわかりやすくするため、` + graphSize + `位のアニメを基準に、相対的にグラフを作っています。\n\n- 視聴者数: まだ見終わってない人も含みます\n- スコア: 10点満点の加重平均です。計算方法は[こちら](https://myanimelist.net/info.php?go=topanime)\n\n`
  const firstText = calendarMd + `作成日時:` + today + '、' + now
  const footerText = `\n\nこのランキングは、MyAnimeListの非公式API「Jikan」を使用し、毎日自動で生成しています。**Jikanに邦題取得機能がないので、ほとんどのアニメは英語のままになっています。ご了承ください。**詳しくは以下のソースコードをご覧ください。\n\n[` + myPackage.repository.toppage + ` :embed:cite]\n\nなお、送信にHerokuとMailjetを使っているので、それぞれに何らかの障害が発生した場合は投稿されません。\n\n`
  const mainMd = json2md(dataJson)

  let title: string = ''
  if (mode == 'bypopularity') {
    title = today + 'の、世界アニメ人気ランキングTop50。1位は' + firstAnime.title + '(' + firstAnime.members + '人視聴)'
  } if (mode == 'upcoming') {
    title = today + '時点で、世界が期待するアニメTop50。1位は' + firstAnime.title + '(' + firstAnime.members + '人視聴予定)'
  } if (mode == 'movie') {
    title = today + 'の、世界のアニメ映画評価ランキングTop50。1位は' + firstAnime.title + '(スコア' + firstAnime.score + ')'
  } if (mode == 'score') {
    title = today + 'の、世界のアニメ評価ランキングTop50。1位は' + firstAnime.title + '(スコア' + firstAnime.score + ')'
  }
  const source = `\n\n===\n\nsource: [MyAnimeList](https://myanimelist.net/topanime.php?type=` + mode + `) / Created at ` + today + `, ` + now
  const from = process.env.SENDER_EMAIL
  const fromName = 'はてな投稿'
  const to = process.env.HATENABLOG_POST_EMAIL
  const content = graphMd + firstText + style + mainMd + tableMd + source + footerText

  console.log('Title: ' + title)

  console.log(title, content, from, fromName, to)

}

mode == 'oyasumi' ? console.log("今日はお休み") : GetMalRanking(graphSize)
