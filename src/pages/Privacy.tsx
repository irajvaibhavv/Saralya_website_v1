import { PageHero } from '../components/layout/PageHero'
import { Container } from '../components/ui/Section'

/* Ported from saralya.in/privacy-policy.html (mobile-app privacy policy). */

type Block = { h: string; p?: string[]; sub?: { h: string; p?: string[]; li?: string[] }[]; li?: string[] }

const BLOCKS: Block[] = [
  {
    h: '1. What we collect',
    sub: [
      {
        h: 'Personal information',
        li: ['Full name, date of birth and gender', 'PAN and Aadhaar details, for KYC verification', 'Contact details: phone number and email', 'Employment and income information', 'Bank statements you choose to upload'],
        p: ['Your Aadhaar number is hashed with SHA-256 on your device before it is transmitted. Only the last four digits are retained, so you can recognise which document you submitted.'],
      },
      {
        h: 'Device information',
        li: ['Device model, manufacturer and operating-system version', 'Screen resolution, battery status and storage capacity', 'Network connectivity type and carrier name', 'Device language and timezone', 'Fraud signals: whether the device is rooted, running in an emulator, or reporting a mock location'],
      },
      {
        h: 'Installed applications',
        p: [
          'The app can check whether specific applications from a fixed, published list are present on your device, and reports counts by category only, never the name of any individual app. The list is compiled into the app and is the hard limit on what can ever be detected; it cannot be extended remotely. It is used as one input to a credit assessment.',
          'This is tied to the “App data” consent. It is off until you turn it on, and turning it off stops it.',
        ],
      },
      {
        h: 'Location',
        li: ['GPS coordinates, and the reverse-geocoded address, for address verification and to detect mock locations and duplicate applications', 'Captured while you are signed in and using the app: once at sign-in, again whenever you move more than 50 metres, and periodically about every three minutes'],
        p: ['The app does not hold the Android background-location permission, and declares no background location mode on iOS, so your device does not give it your location once you leave the app. Tracking stops when you sign out.'],
      },
      {
        h: 'Camera',
        li: ['Photographs of KYC documents: PAN and Aadhaar', 'A selfie, for identity verification'],
        p: ['The camera is opened without audio. The app does not record sound, and requests no microphone permission on either platform.'],
      },
      { h: 'SIM and telecom', p: ['Carrier name, network type and the number of active SIM cards. Tied to the “SIM data” consent and off by default.'] },
    ],
  },
  {
    h: '2. How your information is used',
    li: [
      'KYC verification: identity checks required before a regulated lender can disburse a loan',
      'Credit assessment: evaluating your application, by the lender',
      'Fraud prevention: detecting mock locations, emulators, rooted devices and duplicate applications',
      'Loan servicing: disbursement, repayments, statements and closure',
      'Regulatory compliance: records the lender is required to keep',
    ],
    p: ['We do not use your data for advertising, and we do not sell it. The app contains no advertising software and collects no advertising identifier.'],
  },
  {
    h: '3. Consent',
    p: [
      'Every optional data category is off by default. Nothing is pre-ticked and nothing is bundled. You grant each category separately on the permissions screen, and can review or withdraw any of them later from Data Permissions in the app.',
      'Withdrawing consent stops further collection in that category. It does not retroactively delete data already used to reach a lending decision, which the lender is required to retain.',
      'Declining a category does not stop the app working; it means your application is assessed without that signal.',
    ],
  },
  {
    h: '4. Storage and security',
    li: ["All data is transmitted over HTTPS, with certificates validated against your device's trust store", 'Data is stored on servers in India', 'Access is restricted to authorised personnel'],
    p: [
      "On your device: the app stores your session and your in-progress application locally, so losing signal does not cost you the form you have just filled. This local store relies on the operating system's app sandbox and is not separately encrypted. It is excluded from Android cloud backups, and sessions expire after 30 days. Keep your device locked, and avoid rooting or jailbreaking it.",
      "Retention follows the lender's regulatory obligations: for loan records, a minimum of five years under RBI rules.",
    ],
  },
  {
    h: '5. Who your data is shared with',
    li: ['The lender whose loan you applied for, who is the decision-maker', 'Credit bureaus such as CIBIL and Equifax, for credit assessment, by the lender', 'Regulatory authorities, where required by law'],
  },
  {
    h: '6. Your rights',
    p: ['Under the Digital Personal Data Protection Act, 2023, you may:'],
    li: [
      'Access the personal data held about you',
      'Request correction of inaccurate or incomplete data',
      'Withdraw consent for any optional collection category',
      'Nominate another person to exercise these rights on your behalf',
      'Request erasure, subject to the retention periods the lender must observe',
      'Raise a grievance, and escalate to the Data Protection Board of India if it is not resolved',
    ],
  },
  {
    h: '7. Permissions',
    li: [
      'Camera: capture PAN, Aadhaar and selfie; requested at the document scan step',
      'Location (while in use): address verification and fraud checks; requested at the KYC address step',
      'Phone state: SIM and carrier verification; only if you grant “SIM data”',
      'Photos / storage: attach documents you choose; requested when you attach a file',
      'Notifications: application status updates; requested on first launch',
    ],
    p: ['All permissions are requested at the point they are needed. Declining any of them leaves the app usable, with that step handled another way. The app requests no access to your contacts, call logs, SMS messages, calendar or microphone.'],
  },
  { h: '8. Children', p: ['The app is for applicants aged 18 and over. We do not knowingly collect data from children.'] },
  {
    h: '9. Contact us',
    p: ['For privacy queries, to exercise any right above, or to raise a grievance:'],
    li: ['Email: info@saralya.in', 'Saralya Tech Solutions Private Limited, Delhi NCR, India'],
  },
  { h: '10. Changes to this policy', p: ['We may update this policy. Material changes will be communicated in the app and published here, with the “Last updated” date above revised.'] },
]

export function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede={
          <>
            For the Saralya mobile application · Last updated September 2026.
            <br />
            <br />
            Saralya is not a lender. Saralya Tech Solutions Private Limited builds and operates this app. Loans are
            offered, sanctioned and disbursed by the RBI-regulated entity whose name and registration number are shown
            to you inside the app before you accept any offer. That entity, not Saralya, decides your application and
            holds your loan.
          </>
        }
      />
      <Container className="pb-20">
        <div className="max-w-3xl space-y-10 rounded-3xl bg-white p-7 shadow-sm md:p-12">
          {BLOCKS.map((b) => (
            <section key={b.h}>
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">{b.h}</h2>
              <Body p={b.p} li={b.li} />
              {b.sub?.map((s) => (
                <div key={s.h} className="mt-5">
                  <h3 className="text-[16px] font-bold">{s.h}</h3>
                  <Body p={s.p} li={s.li} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  )
}

function Body({ p, li }: { p?: string[]; li?: string[] }) {
  return (
    <>
      {li && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-ink2">
          {li.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      )}
      {p?.map((x) => (
        <p key={x} className="mt-3 text-[15px] leading-relaxed text-muted">
          {x}
        </p>
      ))}
    </>
  )
}
