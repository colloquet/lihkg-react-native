const fs = require('fs')
const hkgmoji = require('./hkgmoji.json')

function appendLine(content) {
  fs.appendFile('hkgmoji.js', `${content}\n`, (err) => {
    if (err) {
      console.log('error writing line', err)
    }
  })
}

async function init() {
  appendLine('const hkgmoji = {')

  console.log('[info] Getting hkgmoji.json...')

  const allKeys = hkgmoji.reduce((acc, cur) => {
    const normalKeys = cur.icons.map(icon => icon[1])
    const specialKeys = cur.special ? cur.special.map(icon => icon[1]) : []
    return [
      ...acc,
      ...normalKeys,
      ...specialKeys,
    ]
  }, [])

  // eslint-disable-next-line
  for (let [index, key] of allKeys.entries()) {
    const staticKey = key.replace('/faces/', '/faces_png/').replace('.gif', '.png')
    appendLine(`  '/${key}': require('./${key}'),`)
    appendLine(`  '/${staticKey}': require('./${staticKey}'),`)
    console.log(`[success] [${index + 1}/${allKeys.length}] ${key}`)
  }

  appendLine('}')
  appendLine('')
  appendLine('export default hkgmoji')
  console.log('[success] All done!')
}

init()
