import * as yargs from 'yargs';

interface Args {
  directory: string;
  token: string;
  prefix: string;
  owner: string;
  repo: string
}

export const getArgs = (): Args => {
  const yargsConfig = yargs
    .option('directory', {
      alias: 'd',
      description: 'Input directory',
      type: 'string',
      demandOption: true
    })
    .option('gh-token', {
      alias: 't',
      description: 'GitHub Access Token',
      type: 'string',
      demandOption: true
    })
    .option('prefix', {
      alias: 'p',
      description: 'GitHub issue prefix',
      type: 'string',
      default: ''
    })
    .option('owner', {
      description: 'GitHub repository owner',
      type: 'string',
      demandOption: true,
    })
    .option('repo', {
      description: 'GitHub repository name',
      type: 'string',
      demandOption: true,
    })
    .help()
    .alias('help', 'h');

  const args = yargsConfig.argv

  return {
    ...args,
    token: args['gh-token'],
  };
};
