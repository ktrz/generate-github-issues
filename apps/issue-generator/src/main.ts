import { Octokit } from '@octokit/core';

import { lstat, readdir, readFile } from 'fs/promises'
import * as path from 'path';

const octokit = new Octokit({ auth: process.env.GH_ACCESS_TOKEN })

console.log(process.cwd())

console.log(process.env.GH_ACCESS_TOKEN)

run()

async function getFiles(directory: string): Promise<string[]> {
  return readdir(directory)
    .then(entries => entries.map(p => path.join(directory, p)))
      .then(async paths => {
        const isFile = await Promise.all(paths.map(p => lstat(p).then(s => s.isFile())))

        return paths.filter((p, index) => isFile[index])
      })
}

async function run() {
  const files = await getFiles('.issue-templates')

  console.log(files)
  const filesContent = await Promise.all(files.map(f => readFile(f, {encoding: 'utf-8'})))

  const results = files.map((p, index) => ({
    name: path.parse(p).name,
    content: filesContent[index]
  }))

  await Promise.all(results.map(async ({name, content}) => {
    try {
      await octokit.request('POST /repos/ktrz/test-repo/issues', {
        title: name,
        body: content
      })
    } catch (e) {
      console.error(e)
    }
  }))
}
