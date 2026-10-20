/* The three places a Saralya agent works: inside the borrower's app, inside
   the officer's day, and on top of the book. Each one is shown running, in
   its own recording.

   TODO(Vishal): the three recordings. `video` is the file under /video and
   `poster` its still; until they land the panel says what is coming. The
   borrower app, the AI personal-discussion platform the branch officer runs,
   and the portfolio-quality monitor. */

export type Track = {
  id: 'app' | 'workflow' | 'analytics'
  tab: string
  title: string
  lede: string
  items: { title: string; body: string }[]
  video: string | null
  poster: string | null
  /** the flat field the device sits on: one token, no new colours */
  tint: string
  /** what the recording shows, until the recording is here */
  waiting: string
}

export const TRACKS: Track[] = [
  {
    id: 'app',
    tab: 'In-app agents',
    title: 'In-app agents',
    lede: 'An agent inside the borrower’s app, where the application is actually filled.',
    items: [
      { title: 'Friction, as it happens', body: 'Where the form is abandoned, which field is retyped, where the journey stalls — named while the borrower is still on the screen, not in next month’s funnel report.' },
      { title: 'KYC and onboarding', body: 'Identity, address and bank in one consented run over Account Aggregator and CKYC, with the Key Fact Statement in front of the borrower before anything is signed.' },
      { title: 'Answers in the app', body: 'What a branch officer would have been asked at the counter, answered in the app, in the borrower’s own language, at the step where the question comes up.' },
      { title: 'Hand-off to a human', body: 'When the file needs a person, it goes with everything already gathered — not as a fresh call that starts from the name.' },
    ],
    video: null,
    poster: null,
    tint: 'bg-accent',
    waiting: 'The borrower app, recorded end to end',
  },
  {
    id: 'workflow',
    tab: 'Agentic workflow',
    title: 'Agentic workflow',
    lede: 'The personal discussion, run as a conversation and written up as a file.',
    items: [
      { title: 'An agent with a face and a name', body: 'The PD is run as a conversation on video, not as a form: the borrower answers a person, and the officer watches rather than types.' },
      { title: 'End to end, not a step', body: 'It asks, it probes the answer that does not add up, it records the premises and the stock, and it closes the discussion itself.' },
      { title: 'The write-up builds itself', body: 'Income, obligations, the business as described, with photographs, time and location attached — the PD note is ready before the officer is back at the branch.' },
      { title: 'It escalates what it cannot sign', body: 'A deviation, a contradiction, a document that does not match: flagged with the reason, to the person whose signature it needs.' },
    ],
    video: null,
    poster: null,
    tint: 'bg-petrol',
    waiting: 'The AI personal-discussion platform, as a branch officer runs it',
  },
  {
    id: 'analytics',
    tab: 'Actionable analytics',
    title: 'Actionable analytics',
    lede: 'The book read the way a review committee asks for it, every morning.',
    items: [
      { title: 'Portfolio quality, monitored', body: 'Bucket and vintage, SMA-0 / 1 / 2 and NPA movement, concentration by product, geography and ticket — the PQM pack, written from the ledger.' },
      { title: 'Officer and branch performance', body: 'Files touched, time per stage, approval and conversion, collections against promise-to-pay. A coaching conversation that names a stage, not a month-end number.' },
      { title: 'Early warning, not post-mortem', body: 'The first failed NACH, the skipped GST filing, the enquiry with another lender — surfaced on the day, with the accounts to call first.' },
      { title: 'The review pack, unasked for', body: 'Roll-rates, cohorts ageing badly and what changed since last month, on your desk on the first — no one assembles it.' },
    ],
    video: null,
    poster: null,
    tint: 'bg-lav2',
    waiting: 'The portfolio-quality monitor, on a live book',
  },
]
