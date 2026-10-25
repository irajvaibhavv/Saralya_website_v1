import type { Starter } from '../content/chat'

// TODO: point at the model endpoint once it is exposed.
export async function ask(_q: string): Promise<string> {
  return 'That one needs the full model, which is being wired in. For now the founders read every question. Use “Write to us” and it reaches them today.'
}

/** Turns dropped or attached files into the opening exchange of a chat. */
export function fileStarter(list: FileList): Starter | null {
  const names = [...list].map((f) => f.name)
  if (!names.length) return null
  return {
    q: names.length === 1 ? `Here is my file: ${names[0]}` : `Here are my files: ${names.join(', ')}`,
    a: 'Got it. I will read this once the model is wired in; until then it stays in your browser. Tell me what you want checked and I will pass it on.',
  }
}

// TODO: send to the upload endpoint once it exists; until then files stay in the browser.
export const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg'
