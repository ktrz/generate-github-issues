# generate-issues

This tool allows you to create issues using a template file

# usage

`npx generate-github-issues` with the following params

| Option        | Shorthand   | Description                      | Type     | Required   |
|---------------|-------------|----------------------------------|----------|------------|
| --directory   | -d          | Directory with issue templates   | string   | true       |
| ------------- | ----------- | -------------------------------- | -------- | ---------- |
| --gh-token    | -t          | GitHub Access Token              | string   | true       |
| ------------- | ----------- | -------------------------------- | -------- | ---------- |
| --prefix      | -p          | Prefix added to issue title      | string   | false      |
| ------------- | ----------- | -------------------------------- | -------- | ---------- |
| --owner       |             | GitHub repository owner          | string   | true       |
| ------------- | ----------- | -------------------------------- | -------- | ---------- |
| --repo        |             | Directory with issue templates   | string   | true       |

Example:

```shell
npx generate-github-issues -d .issue-templates -t <YOUR_GH_ACCESS_TOKEN -p "My prefix" --owner=ktrz --repo=test-repo
```
