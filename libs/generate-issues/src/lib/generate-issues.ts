import { Octokit } from '@octokit/core';

import { lstat, readdir, readFile } from 'fs/promises'
import * as path from 'path';

export type Config = { token: string, directory: string, prefix: string, owner: string, repo: string };

export async function generateIssues({token, directory,prefix, owner, repo}:Config) {
  const octokit = new Octokit({ auth: token })

  const files = await getFiles(directory)

  const filesContent = await Promise.all(files.map(f => readFile(f, {encoding: 'utf-8'})))

  const results = files.map((p, index) => ({
    name: path.parse(p).name,
    content: filesContent[index]
  }))

  await Promise.all(results.map(async ({name, content}) => {
    try {
      await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
        title: prefix ? `[${prefix}] ${name}` : name,
        body: content
      })
    } catch (e) {
      console.error(e)
    }
  }))
}

async function getFiles(directory: string): Promise<string[]> {
  return readdir(directory)
    .then(entries => entries.map(p => path.join(directory, p)))
    .then(async paths => {
      const isFile = await Promise.all(paths.map(p => lstat(p).then(s => s.isFile())))

      return paths.filter((p, index) => isFile[index])
    })
}
