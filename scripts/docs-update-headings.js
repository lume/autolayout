import fs from 'fs'
import path from 'path'

let docs = fs.readFileSync(path.resolve('.', 'docs', 'AutoLayout.md')).toString()

docs = docs.replace(/^#/gm, '')

fs.writeFileSync(path.resolve('.', 'docs', 'AutoLayout.md'), docs)
