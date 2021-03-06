// GENERATE REPO URL

let repoEnvs = [
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
] as string[]

let REPO_URL = ''

if (repoEnvs[2] == "main") {
  REPO_URL = `https://github.com/${repoEnvs[0]}/${repoEnvs[1]}/`
} else {
  REPO_URL = `https://github.com/${repoEnvs[0]}/${repoEnvs[1]}/tree/${repoEnvs[2]}`
}

export const CONST_REPO_URL = REPO_URL

// CONSTANTS

export const SITE_NAME = "animegurafu"

export const SITE_DESC = "アニメの海外での評価と視聴者数を、毎日自動で取得して、順位と数値をグラフ化します。"