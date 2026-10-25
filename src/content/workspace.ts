/* Content for the /saralya-ai workspace. Tools are described, not implemented;
   each will call the model endpoint.
   TODO(content): free-run allowances (5 runs, 2 runs, ~4 answers / 12k tokens)
   and the free vs account split are placeholders. */

export type Tool = {
  id: string
  icon: 'emi' | 'compare' | 'checklist' | 'statement' | 'readiness' | 'memo' | 'portfolio' | 'policy'
  name: string
  body: string
  /** 'free' needs nothing; 'account' opens with a free account */
  gate: 'free' | 'account'
  note: string
}

export const TOOLS: Tool[] = [
  { id: 'emi', icon: 'emi', name: 'EMI & eligibility', body: 'What you can borrow, and what it costs each month.', gate: 'free', note: 'Free · no account needed' },
  { id: 'compare', icon: 'compare', name: 'Compare loan offers', body: 'The true cost of two or three offers, side by side.', gate: 'free', note: 'Free · no account needed' },
  { id: 'checklist', icon: 'checklist', name: 'Document checklist', body: 'Exactly what to keep ready for your loan.', gate: 'account', note: 'Uses tokens · 5 free runs' },
  { id: 'statement', icon: 'statement', name: 'Bank statement snapshot', body: 'Read a statement the way an underwriter does.', gate: 'account', note: 'Uses tokens · 1 free run' },
  { id: 'readiness', icon: 'readiness', name: 'Saral readiness report', body: 'A Saral-style credit read on your profile.', gate: 'account', note: 'Uses tokens · 1 free run' },
  { id: 'memo', icon: 'memo', name: 'Credit memo draft', body: 'A structured credit appraisal from your case notes.', gate: 'account', note: 'Uses tokens · 1 free run' },
  { id: 'portfolio', icon: 'portfolio', name: 'Portfolio quality snapshot', body: 'PAR, NPA and concentration from your loan tape.', gate: 'account', note: 'Uses tokens · 2 free runs' },
  { id: 'policy', icon: 'policy', name: 'Credit policy to rules', body: 'Turn a credit policy PDF into decision rules.', gate: 'account', note: 'Uses tokens · 1 free run' },
]

/* notices shown on every workspace screen */
export const GUARDS = [
  { icon: 'spark', title: 'An AI assistant that can be wrong', body: 'Saralya AI is an assistant, not a lender or a human adviser. It gives general information, not a loan offer, and not financial, legal or investment advice.' },
  { icon: 'bank', title: 'Not a lender', body: 'Saralya is a technology provider, not a lender. Nothing here is a loan offer.' },
  { icon: 'shield', title: 'Keep identifiers to yourself', body: 'Please don’t share Aadhaar, PAN, account numbers or passwords. Conversations without an account stay on this browser.' },
]

export const WORKSPACE = {
  eyebrow: 'For lenders and the companies that work with them',
  title: 'Your Saralya LMS workspace',
  body: 'Credit, portfolio, collections, borrower channels and compliance. Ask for a sandbox of your own.',
  cta: 'Open the workspace',
}
