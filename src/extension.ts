import * as vscode from 'vscode'

import type MarkdownIt from 'markdown-it'

const audioUrl =
  'https://translate.google.com/translate_tts?sl=en&tl=en&client=tw-ob&dt=t&ie=UTF-8&oe=UTF-8&q='
const MarkdownItAudio: MarkdownIt.PluginWithOptions<{}> = (md) => {
  md.renderer.rules.html_inline = function (tokens, idx) {
    const next_next = tokens[idx + 2],
      next = tokens[idx + 1],
      cur = tokens[idx]
    if (
      cur &&
      cur.content === '<audio>' &&
      next_next &&
      next_next.content === '</audio>'
    ) {
      const words = next.content.trim()
      if (words.includes(' ')) words.split(' ').join('-')
      next.content = ''
      return `<audio controls src="${audioUrl}${words}">`
    }
    return cur.content
  }
}

export async function activate(_context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(MarkdownItAudio)
    },
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
