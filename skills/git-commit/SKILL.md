---
name: git-commit
description: Craft clean, conventional commit messages
---

## Steps

- Review changes with `git status` and `git diff`
- Stage files individually — `git add <file>`, never `git add -A`
- Write commit messages in the format `<type>: <short description>`

## Rules

- Write in English without a trailing period
- Never commit .env, node_modules/, dist/, or secrets
- Start the subject line in lowercase (proper nouns exempt)
