# AetherHealth

## What It Does

AetherHealth is an AI-powered telehealth platform built as a subscription-based web application. It provides consumers with on-demand access to healthcare across four core verticals: mental health screening and therapy referrals, dermatology via photo-based AI analysis, sexual health (STI testing coordination and birth control), and urgent care for common acute conditions. Each service is priced individually ($19–$39 per consultation), combining AI triage and diagnosis with human clinician oversight.

The platform functions as a full patient portal — tracking vital signs (blood pressure, heart rate, temperature, oxygen, glucose, weight), managing a longitudinal medical records timeline, scheduling telemedicine appointments, and syncing with wearable devices such as Apple Watch and Withings smart scales. The CLAUDE.md roadmap describes planned AI enhancements including diagnostic assistants, predictive health deterioration models, EHR integration, and HIPAA-compliant data handling.

The architecture is a React/TypeScript SPA (Vite + Radix UI + shadcn/ui + Recharts) deployed as a static site to GitHub Pages, meaning the current implementation is a frontend prototype rather than a live clinical system — but the component set and data model represent a complete product specification.

## Core Features & Competitive Landscape

### AI Mental Health Screening & Therapy Referrals
AetherHealth offers instant AI-powered screening for anxiety, depression, and stress, plus matched therapy referrals and medication management at $39/visit.

**Similar products/tools:**
- [Teladoc Health — Mental Health](https://www.teladoc.com/mental-health/) — largest telemedicine platform globally, operates in 130+ countries; full psychiatry and therapy, higher price points, insurance-focused
- [BetterHelp](https://www.betterhelp.com/) — subscription therapy ($60–$100/week) with human therapists only; no AI screening layer
- [Talkspace](https://www.talkspace.com/) — 1M+ users; licensed therapist messaging/video; covers insurance, no AI triage
- [Hims & Hers](https://www.forhims.com/mental-health) — gender-specific mental health, medication delivery; 2.2M subscribers by 2024
- [Woebot](https://woebothealth.com/) — clinically validated CBT chatbot; pivoting to enterprise/B2B healthcare; held FDA Breakthrough Device Designation
- [Wysa](https://www.wysa.com/) — penguin AI chatbot, CBT + DBT + mindfulness; FDA Breakthrough Device status (2025); blends AI with optional human coaching
- [Youper](https://www.youper.ai/) — AI therapy using CBT, ACT, DBT with adaptive learning from check-ins
- [Sanvello](https://www.sanvello.com/) — CBT-based app with optional professional escalation, insurance-covered
- [MDLIVE — Mental Health](https://www.mdlive.com/mental-health/) — board-certified psychiatrists/therapists, ongoing prescriptions
- [Cerebral](https://cerebral.com/) — subscription mental health with prescribers; medication + therapy bundled

### AI Dermatology (Photo-Based Skin Analysis)
Users submit photos of skin conditions; AI identifies the condition and produces treatment plans, with dermatologist review. Priced at $29/consultation.

**Similar products/tools:**
- [SkinVision](https://www.skinvision.com/) — mole/spot tracking with low/medium/high risk assessment; trained on millions of dermatology images
- [First Derm](https://www.firstderm.com/) — board-certified dermatologist review of uploaded photos; AI model screens 68 common conditions
- [Skinive](https://skinive.com/) — AI skin scanner for patients and clinicians; dermatology apps comparison resource
- [DermEngine](https://www.dermengine.com/) — the "most intelligent dermatology platform," AI-assisted clinical decision support
- [VisualDx](https://www.visualdx.com/solutions/derm-expert/) — diagnostic AI for dermatology used by clinicians
- [Eczemaless AI](https://eczemaless.com/) — condition-specific AI for eczema management
- [DirectDerm](https://directderm.com/) — board-certified dermatologist asynchronous consults
- [AI-Derm](https://ai-derm.com/) — AI dermatologist scanner tool
- [Cureskin](https://cureskin.com/) — AI skin analysis with personalized regimen; focused on South Asian markets
- [Miiskin](https://miiskin.com/) — photo-based mole tracking and skin journal, dermatologist-review option

### Sexual Health (Confidential STI Testing & Birth Control)
Confidential STI lab coordination, birth control prescriptions, and sexual wellness consultations at $25/visit.

**Similar products/tools:**
- [Wisp](https://hellowisp.com/) — dedicated sexual/reproductive health telehealth; at-home STI tests ($99–$149), STD treatment consults ($39); includes prescription delivery
- [Nurx](https://www.nurx.com/) — at-home STI testing with insurance coverage; birth control, PrEP, and HIV testing; $15 consultation fee
- [PlushCare — Sexual Health](https://plushcare.com/sexual-health) — physician-led STI testing and treatment; requires physical lab visits for some tests
- [Hims & Hers — Sexual Health](https://www.forhims.com/) — gender-specific ED, STI, birth control with medication delivery
- [Planned Parenthood Direct](https://www.plannedparenthood.org/get-care/telehealth) — telehealth for birth control and UTI; state availability varies
- [Twentyeight Health](https://twentyeighthealth.com/) — birth control telehealth targeting underserved populations
- [Helixa Health](https://helixahealth.com/) — online STI consults and treatment
- [Mistr](https://getmistr.com/) — PrEP and HIV care focused telehealth
- [The Body Pro — PrEP Platforms](https://www.thebodypro.com/) — platform guide for PrEP access and adherence

### Urgent Care (Acute Conditions — Cold, Flu, UTI)
AI symptom analysis, quick diagnosis, and prescription readiness for common acute conditions at $19/visit.

**Similar products/tools:**
- [Teladoc — General Medical](https://www.teladoc.com/) — 24/7 board-certified physicians; treats 300+ conditions; most established brand
- [MDLIVE — Urgent Care](https://www.mdlive.com/urgent-care/) — preventive wellness, non-emergency acute care, prescriptions
- [PlushCare](https://plushcare.com/) — primary care and urgent care; same-day appointments; insurance accepted
- [Amazon Clinic](https://clinic.amazon.com/) — message-based care for 30+ common conditions; flat-fee; no insurance needed
- [Hims & Hers — Primary Care](https://www.forhims.com/) — men's/women's primary care; prescription delivery
- [98point6](https://www.98point6.com/) — text-based AI-assisted primary care used by employers and health systems as a white-label platform
- [K Health](https://khealth.com/) — AI symptom checker + physician consult; subscription model; integrates lab results
- [Carbon Health](https://carbonhealth.com/) — hybrid in-person + telehealth; strong mobile UX
- [Doctor on Demand](https://www.doctorondemand.com/) — video visits with physicians; part of Included Health

### Vital Signs Monitoring & Wearable Integration
The platform tracks 6 vital parameters (BP, HR, temperature, weight, SpO2, blood glucose), renders trend charts, tracks health goals with progress bars, manages medication schedules, and syncs with devices including Apple Watch, Omron BP Monitor, Withings Scale, and glucose meters.

**Similar products/tools:**
- [Apple Health / HealthKit](https://www.apple.com/health/) — central iOS health data aggregator; source of truth for most wearables
- [Google Health Connect](https://health.google/health-connect/) — Android equivalent; standardizing health data APIs
- [MyChart (Epic)](https://www.mychart.org/) — patient portal standard for US hospitals; medical records, test results, messaging
- [Withings Health Mate](https://www.withings.com/us/en/health-mate) — native app for Withings scales, watches, and BP monitors
- [Omron Connect](https://omronhealthcare.com/products/omron-connect-app/) — blood pressure tracking companion app
- [Dexcom G7](https://www.dexcom.com/) — continuous glucose monitoring with trend alerts
- [Welltory](https://welltory.com/) — HRV-based stress/energy tracking; AI health insights from wearable data
- [Samsung Health](https://www.samsung.com/us/mobile/galaxy-watch/health-monitor/) — cross-device health tracking hub
- [Validic](https://validic.com/) — enterprise health data aggregation API used by health systems

### Medical Records & Patient Portal
Longitudinal timeline of consultations, lab results, prescriptions, and imaging; allergy and family history tracking; downloadable/shareable records.

**Similar products/tools:**
- [Epic MyChart](https://www.mychart.org/) — the dominant US patient portal, used by 300M+ patients
- [Cerner HealtheLife](https://www.oracle.com/health/patient-engagement/) — Oracle Health patient portal
- [CommonHealth (Android)](https://www.commonhealth.us/) — open-source health record aggregator
- [Apple Health Records](https://support.apple.com/en-us/HT208680) — FHIR-based records from 1000+ US health systems
- [1upHealth](https://1up.health/) — FHIR-based health data platform for apps and payers
- [Particle Health](https://www.particlehealth.com/) — real-time clinical data API for telehealth platforms
- [Human API](https://www.humanapi.co/) — health data network connecting EHRs to consumer apps

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | Radix UI + shadcn/ui |
| Charts | Recharts (line, area, radial bar, pie) |
| Forms | React Hook Form + Zod |
| State / data fetching | TanStack Query |
| Routing | React Router |
| Deployment | GitHub Pages (static) |

## Build vs Buy Analysis

Rather than building every component from scratch, the following SaaS layers are worth evaluating:

- **Telemedicine infrastructure**: [Doxy.me](https://doxy.me/), [Zoom for Healthcare](https://zoom.us/healthcare), or [Daily.co](https://www.daily.co/) for HIPAA-compliant video
- **AI clinical decision support**: [Microsoft Azure Health Bot](https://azure.microsoft.com/en-us/products/health-bot/), [Amazon Comprehend Medical](https://aws.amazon.com/comprehend/medical/), or [Infermedica API](https://infermedica.com/)
- **AI skin analysis**: [First Derm API](https://www.firstderm.com/ai-dermatology/) or [SkinVision SDK](https://www.skinvision.com/) rather than training a model
- **EHR/FHIR connectivity**: [1upHealth](https://1up.health/) or [Health Gorilla](https://www.healthgorilla.com/)
- **Prescription routing**: [DoseSpot](https://www.dosespot.com/) or [Surescripts](https://surescripts.com/)
- **Lab ordering**: [Truepill](https://truepill.com/) or [Quest Diagnostics API](https://developer.questdiagnostics.com/)
- **Patient auth / HIPAA compliance**: [Compliant Health Auth](https://www.healthit.gov/), or use [Clerk](https://clerk.com/) + BAA

## Market Position

AetherHealth targets the growing direct-to-consumer telehealth segment, currently dominated by Teladoc, Hims & Hers, and MDLIVE. Its differentiation is the bundling of four high-demand verticals (mental health, derm, sexual health, urgent care) under one AI-first interface, rather than the specialist single-condition focus of most DTC competitors. The price point ($19–$39/visit) is competitive against Teladoc ($85+/visit without insurance) and positions it as an accessible alternative.

The primary competitive tension is regulatory and clinical: AI diagnostic features (especially dermatology photo analysis and mental health screening) operate in FDA-regulated territory. Sustainable differentiation will come from the quality of the AI models, clinician oversight layer, and HIPAA-compliant data infrastructure — none of which are implemented in the current frontend prototype but are detailed in the CLAUDE.md planning documents.

---

## Competitor Pricing Analysis

| Competitor | Free Tier | Paid Plans | Enterprise / B2B | Notes |
|---|---|---|---|---|
| Teladoc Health | None | $89/visit (no insurance); $0 with many insurance plans | Employer wellness via Teladoc Health Plans | Largest US telehealth by volume; 300+ conditions treated |
| MDLIVE | None | Urgent care $89; Derm $95; Therapy $108; Psych initial $284 | Aetna-owned; employer and payer contracts | Insurance accepted; strong urgent care brand |
| PlushCare | None | $129/visit; membership $14.99/mo reduces visits to $99 | Accolade-owned; employer benefit integration | Same-day appointments; insurance-focused |
| K Health | Free symptom checker | Primary care $35/visit; $29/mo unlimited primary care | K for Business; employer subscription | AI triage layer differentiates it; strong mobile UX |
| Hims & Hers | None | $39–$99/visit by specialty; medication delivery bundles | Not a primary enterprise channel | 2.2M subscribers by end 2024; $1.2B revenue 2024 |
| BetterHelp | None | $65–$100/week ($260–$400/month) | Corporate wellness available | Largest online therapy; private-pay only (no insurance) |
| Talkspace | None | $69–$109/week; insurance co-pay $15–$30 | Talkspace for Business employer plans | Accepts major insurance + Medicare Part B |
| Nurx | None | $15 consultation; lab test kits $99–$149 | Payer partnerships | At-home STI testing, birth control, PrEP focus |
| Amazon Clinic | None | $35–$75 flat fee; 30+ condition types | Amazon Business; Prime integration | No subscription; pay-per-visit; no insurance |
| 98point6 | None | B2B/white-label only | $3–$6 PMPM employer licensing | AI-first; sells to health systems and employers |

**AetherHealth target price points ($19–$39/visit) are below most uninsured competitors and compete directly with K Health's per-visit pricing.**

---

## Market Size & Growth

- **TAM (Global Telehealth):** $123.26 billion in 2024; projected $455.27 billion by 2030 (Grand View Research, 2025)
- **US Telehealth TAM:** $42.61 billion in 2024; projected $358.96 billion by 2034 at 23.84% CAGR (Towards Healthcare, 2025)
- **SAM (DTC Telehealth — urgent care + mental health + derm + sexual health):** Estimated $18–25 billion in 2025, based on the ~40% DTC segment share of the US market
- **Mental Health Apps sub-segment:** $7.48 billion globally in 2024; $17.52 billion by 2030 at 14.6% CAGR (Grand View Research)
- **AI Dermatology market:** $1.3 billion in 2024; growing at 18%+ CAGR driven by FDA clearances for AI skin analysis
- **Growth rate:** 23–25% CAGR globally through 2030–2034
- **Key trends driving growth:**
  - Post-pandemic normalization of virtual care; 37% of US adults used telehealth in 2023 (CDC)
  - Insurance parity legislation expanding telehealth reimbursement at state level
  - GLP-1 medication demand creating new high-value telehealth consult streams (Hims & Hers revenue grew 43% YoY to $1.2B in 2024 partly driven by this)
  - FDA clearing 1,250+ AI-enabled medical devices as of July 2025; AI diagnostic tools entering mainstream acceptance
  - Employer wellness spending shifting to virtual-first models (Spring Health $3.3B valuation; Lyra Health $5.58B valuation in 2022)
  - Mental health provider shortage (350M+ Americans live in Mental Health Professional Shortage Areas) driving demand for AI-assisted triage

---

## Regulatory & Compliance Requirements

### HIPAA (Health Insurance Portability and Accountability Act)
- **Required for:** Any platform storing or transmitting Protected Health Information (PHI) — applies as soon as real patient data, consult notes, or lab results are stored
- **Business Associate Agreements (BAA):** Must be signed with every vendor that touches PHI: cloud host, analytics provider, video platform, email provider
  - AWS: BAA available via AWS Artifact; 120+ HIPAA-eligible services — [aws.amazon.com/compliance/hipaa-compliance](https://aws.amazon.com/compliance/hipaa-compliance/)
  - Azure: BAA included in Microsoft Product Terms by default — [learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us](https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us)
  - Supabase: HIPAA-compliant on Team Plan+ with BAA and HIPAA add-on enabled; AES-256 encryption at rest, TLS in transit — [supabase.com/docs/guides/security/hipaa-compliance](https://supabase.com/docs/guides/security/hipaa-compliance)
  - Zoom for Healthcare: Separate HIPAA-compliant tier with BAA
- **Key HIPAA technical requirements:** Encryption at rest (AES-256), TLS 1.2+ in transit, audit logs for all PHI access, automatic session timeout, minimum necessary access controls, breach notification within 60 days

### FDA Software as a Medical Device (SaMD)
- **Directly applicable to AetherHealth's AI features:**
  - AI dermatology photo analysis (skin lesion classification) → likely Class II SaMD requiring 510(k) clearance
  - AI mental health screening tools with diagnostic claims → potentially Class II under FDA's digital health framework
  - AI symptom checker providing specific diagnoses → FDA enforcement discretion has been narrow but is evolving
- **FDA AI/ML SaMD Action Plan (finalized December 2024):** Requires Predetermined Change Control Plans (PCCP) for adaptive AI features; total product lifecycle (TPLC) approach
- **FDA Draft Guidance (January 6, 2025):** "Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations" — directly governs AI diagnostic software
- **510(k) pathway:** 97% of cleared AI devices in 2024 used this pathway; requires demonstrating substantial equivalence to a predicate device
- **Key risk:** Positioning AI features as "informational" vs. "diagnostic" determines regulatory class; FTC has separately acted against misleading health app claims

### FTC Health Breach Notification Rule
- **Updated 2024:** FTC expanded the rule to cover health apps and connected devices; telehealth apps handling health data must notify users of breaches even if not covered by HIPAA
- Affects apps that collect health information (symptoms, diagnoses, medications) outside traditional covered-entity relationships

### State Telehealth Laws
- **Prescribing restrictions:** Many states require prior in-person relationship or Ryan Haight Act compliance for controlled substance prescriptions via telehealth; DEA temporary exemptions post-COVID were extended through 2025
- **Licensure:** Clinicians must be licensed in the state where the patient is located; multistate licensing compacts (IMLC for physicians, NLC for nurses) reduce friction but do not eliminate it
- **Mandatory parity laws:** 43 states + DC have telehealth insurance parity laws as of 2024; affects reimbursement model

### SOC 2 Type II
- Required by enterprise buyers and insurance partners; typically takes 6–12 months to achieve
- Tools: [Vanta](https://www.vanta.com/) (automated, $24K–$40K/year), [Drata](https://drata.com/) ($15K–$30K/year), [Secureframe](https://secureframe.com/)

### GDPR (EU)
- Applies if any EU residents use the platform; health data is "special category" requiring explicit consent and data minimization
- Data residency requirements may mandate EU-hosted infrastructure

### Canadian Telehealth
- Must comply with provincial privacy laws (PHIPA in Ontario, PIPA in Alberta, etc.) and federal PIPEDA; stricter than HIPAA in some respects
- College of Physicians and Surgeons rules vary by province; telemedicine licensing reciprocity not universal

---

## Open Source Alternatives

| Project | GitHub Stars (approx.) | Language | License | What it does | Link |
|---|---|---|---|---|---|
| OpenEMR | 3,000+ | PHP + JavaScript | GPL v3 | Full EHR: scheduling, billing, prescriptions, FHIR R4, 30+ languages | [github.com/openemr/openemr](https://github.com/openemr/openemr) |
| Medplum | 1,500+ | TypeScript (Node + React) | Apache 2.0 | FHIR-native healthcare developer platform; managed FHIR API + auth | [github.com/medplum/medplum](https://github.com/medplum/medplum) |
| OpenTeleHealth | 400+ | Python / Django | MIT | Telehealth video consultation + patient portal framework | [github.com/opentelehealth](https://github.com/opentelehealth) |
| GNU Health | 500+ | Python (Tryton) | GPL v3 | Hospital management + EHR; WHO recommended; multilingual | [health.gnu.org](https://health.gnu.org/) |
| Bahmni | 600+ | Java + React | LGPL v2.1 | Hospital info system for low-resource settings; OpenMRS-based | [github.com/Bahmni](https://github.com/Bahmni) |
| FreeCBT / Thought Saver | 200+ | React Native | GPL v3 | Open-source CBT thought record app; cognitive distortion identification | [github.com/erosson/freecbt](https://github.com/erosson/freecbt) |
| CommonHealth | 300+ | Android/Java | Apache 2.0 | FHIR health record aggregator for Android; connects to 1000+ health systems | [commonhealth.us](https://www.commonhealth.us/) |
| HAPI FHIR | 4,000+ | Java | Apache 2.0 | Gold-standard open-source FHIR server; most widely deployed FHIR implementation | [github.com/hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) |

---

## Recent Funding & M&A Activity (2023–2026)

| Company | Event | Amount / Valuation | Date | Notes |
|---|---|---|---|---|
| Hims & Hers | Revenue milestone | $1.2B revenue (2024) | Feb 2025 | 43% YoY growth; 2.2M subscribers; GLP-1 prescribing major driver |
| Spring Health | Series E | $100M at $3.3B valuation | Jul 2024 | Employer mental health; eyeing IPO; acquired VOS.health Apr 2025 |
| Lyra Health | Prior valuation | $5.58B | Jan 2022 | Acquired Bend Health Jul 2025; dominant employer EAP replacement |
| Headspace Health | Debt financing | $105M | Jul 2023 | Merger of Headspace + Ginger complete; B2B wellness focus |
| Teladoc Health | Market pressure | Market cap ~$1.8B | 2024 | Down from $40B peak; profitability focus; paused acquisitions |
| LifeMD | Acquisition | Undisclosed | 2024 | Bought assets from Optimal Human Health MD for women's health expansion |
| Humana / Heal | Acquisition | ~$100M | H1 2023 | Humana acquired remote consultation provider Heal |
| US Digital Health Total | VC funding | $5.7B in H1 2024; $10.1B full year 2024 | 2024 | 497 deals; AI-first companies capturing disproportionate share |
| Amazon Clinic | Expansion | Internal | 2023–2024 | Expanded to all 50 states; added sexual health, mental health |
| K Health | Raised | $59M Series F | 2023 | AI primary care; partnerships with Cedars-Sinai, Maccabi |

---

## Revenue Model Options

### Direct-to-Consumer (current AetherHealth model)
- **Pay-per-visit:** $19–$39/consult; low friction but high CAC vs. LTV ratio
- **Subscription:** $29–$49/month for unlimited urgent care + reduced specialty pricing; improves LTV significantly (Hims model)
- **Bundled annual plans:** $199–$499/year for all-access; improves retention and reduces payment friction

### Insurance Billing (B2B2C)
- **CPT code billing:** Telehealth visits billed via CPT codes 99201–99215 (E&M); audio-video codes 99441–99443; reimbursement $45–$150/visit from payers
- **Value-based care contracts:** Capitated PMPM arrangements with payers; requires scale (1,000+ attributed lives)
- **Requires:** Medical group entity, credentialing in all 50 states, clearinghouse integration (Waystar, Availity)

### Employer Wellness (B2B)
- **PEPM model:** $2–$10 per employee per month for unlimited access; Lyra charges ~$65–$90 PEPM
- **Pilot then expand:** Start with 500-employee companies; grow to Fortune 500
- **ROI framing:** ~$1,500/employee/year in productivity loss from untreated mental health; telehealth ROI typically 3:1–6:1

### White-Label / Platform Licensing
- **License to health systems:** $50K–$500K/year SaaS fee; health system handles patient acquisition
- **API revenue:** Charge for clinical decision support AI API; $0.10–$0.50/query at scale

### Pharmaceutical Partnerships
- **Prescription routing fees:** $3–$8 per prescription routed through pharmacy partner
- **Patient support programs:** Pharma companies pay for medication adherence programs integrated into telehealth platform

### Data & Analytics (long-term, privacy-compliant)
- **Aggregate de-identified insights:** Sold to pharmaceutical companies, insurers, or health systems; requires IRB and explicit patient consent
- **Population health dashboards:** Employer reporting on aggregate health trends

---

## Key APIs & Data Services to Integrate

| Service | Category | Pricing | What it provides | Link |
|---|---|---|---|---|
| Infermedica API | Symptom triage / AI clinical | $0.05–$0.15/call; enterprise custom | Symptom checker, triage, diagnosis suggestion; 1,500+ conditions | [infermedica.com](https://infermedica.com/) |
| Amazon Comprehend Medical | NLP / clinical entity extraction | $0.01/100 chars; HIPAA-eligible | Extract diagnoses, medications, anatomy from clinical text | [aws.amazon.com/comprehend/medical](https://aws.amazon.com/comprehend/medical/) |
| DoseSpot | e-Prescribing | $0.50–$2/prescription | EPCS-certified e-prescribing integration; DEA-compliant | [dosespot.com](https://www.dosespot.com/) |
| Surescripts | Prescription routing | Enterprise pricing | Largest e-prescribing network in US; medication history | [surescripts.com](https://surescripts.com/) |
| Health Gorilla | FHIR / EHR connectivity | Custom enterprise | Nationwide clinical data network; lab results, CCDs, imaging | [healthgorilla.com](https://www.healthgorilla.com/) |
| Particle Health | Real-time clinical records | Custom | 300M+ patient records; FHIR R4 API; real-time ADT feeds | [particlehealth.com](https://www.particlehealth.com/) |
| 1upHealth | FHIR aggregation | $0.10–$0.50/patient/month | FHIR R4 API; connects to Epic, Cerner, Athenahealth | [1up.health](https://1up.health/) |
| Doxy.me | HIPAA video | Free–$35/month/provider | HIPAA-compliant video visits; no patient app install required | [doxy.me](https://doxy.me/) |
| Daily.co | Video API | $0.00099/participant-min | Programmable video; HIPAA BAA available; React SDK | [daily.co](https://www.daily.co/) |
| Truepill | Lab ordering & pharmacy | Per-order pricing | Nationwide lab ordering + pharmacy fulfillment API | [truepill.com](https://truepill.com/) |
| Stripe | Payments | 2.9% + $0.30/transaction | PCI-compliant; healthcare-specific no FSA/HSA card support | [stripe.com](https://stripe.com/) |
| Twilio | HIPAA SMS / fax | $0.0079/SMS; BAA available | Patient reminders, secure messaging; HIPAA BAA available | [twilio.com](https://www.twilio.com/) |
| Apple HealthKit | Wearable data | Free SDK | iOS health data aggregation; Apple Watch, Omron, Dexcom | [developer.apple.com/health-fitness](https://developer.apple.com/health-fitness/) |
| Google Health Connect | Wearable data (Android) | Free SDK | Android health data standard; replaces Google Fit | [health.google/health-connect](https://health.google/health-connect/) |

---

## Distribution & Go-to-Market

### Direct to Consumer (DTC)
- **Performance marketing:** Google Ads (health-related keywords $8–$25 CPC); Meta Ads (HIPAA-compliant interest targeting); TikTok health content
- **SEO content:** Long-tail symptom content ("what is a UTI", "how to treat ringworm") drives organic; high-intent traffic with clear conversion path
- **CAC benchmark:** DTC telehealth CAC ranges $80–$300; LTV must be $400+ to sustain; subscription model required for unit economics

### App Store Optimization
- Healthcare apps benefit from Apple's dedicated App Store health category; featured placements available for FDA-cleared features
- Google Play healthcare category; requires HIPAA declaration in privacy policy
- Keyword strategy: "online doctor," "telemedicine," "urgent care near me" (location-based queries)

### Employer Wellness Channel
- **HR tech stack integrations:** Connect to Workday, BambooHR, ADP for employee roster sync
- **Benefits broker partnerships:** Brokers influence 60%+ of SMB health benefit decisions; referral/rev-share model
- **SHRM (Society for Human Resource Management)** and benefits conference presence

### Insurance & Payer Partnerships
- **Credentialing + network inclusion:** Getting listed in insurance networks drives volume but requires 6–12 months of credentialing
- **Carve-out behavioral health contracts:** Many insurers outsource mental health to specialized telehealth vendors

### Clinical Partnerships
- **Hospital system referral arrangements:** Urgent care overflow routing; emergency department diversion programs
- **Primary care integration:** API-based referral from PCPs for specialist telehealth (derm, mental health)
- **Pharmacy partnerships:** CVS MinuteClinic, Walgreens Health for prescription fulfillment + patient acquisition

---

## Technical Risk & Compliance Challenges

### HIPAA BAA Chain
- Every vendor in the data path must sign a BAA before any PHI flows; missing one vendor creates HIPAA exposure
- Common gap: analytics tools (Mixpanel, Amplitude) are not HIPAA-compliant by default; must use HIPAA-eligible analytics (PostHog self-hosted, Heap with BAA, or Snowflake-based custom analytics)

### FDA SaMD Classification
- AI dermatology photo analysis will likely require 510(k) clearance; typical timeline 12–18 months, cost $200K–$500K+
- "Wellness" framing (e.g., "this is informational, not diagnostic") may avoid SaMD classification but limits marketing claims and reduces clinical credibility
- AI mental health screening tools with PHQ-9 or GAD-7 validated scoring could qualify as Class II SaMD

### Data Residency
- GDPR Article 46 restricts transfer of EU health data to third countries without Standard Contractual Clauses (SCCs)
- Some US state laws (California CMIA) have stricter requirements than HIPAA for mental health and reproductive health data
- Post-Roe environment: California AB 352 (2023), Illinois HB 1464 impose stricter reproductive health data protections; AetherHealth's sexual health features require careful data handling

### Consent Management
- Telehealth informed consent must be state-specific; some states require written consent for first telehealth encounter
- Minor consent laws vary: minors can consent to STI treatment, mental health services, and substance use services in most states without parental consent; platform must enforce age-appropriate consent flows
- Reproductive health data: Must not share with third parties without explicit consent under FTC rules (2024 guidance)

### Clinician Oversight Requirements
- AI diagnostic features require licensed clinician "in the loop" to avoid unauthorized practice of medicine
- State medical board rules on AI-assisted diagnosis vary; some states explicitly prohibit AI-generated diagnoses without clinician review
- Liability exposure: The AI model error rate and oversight documentation are central to malpractice risk

### Prescription Regulations
- Ryan Haight Online Pharmacy Consumer Protection Act: Historically required in-person exam before prescribing controlled substances via telehealth
- DEA telemedicine exemptions (extended through 2025) allow controlled substance prescribing; permanent rules expected in 2026
- Sexual health features (birth control, PrEP): Non-controlled; easier to prescribe via telehealth in most states

---

## Feature Gap Analysis

Comparing AetherHealth's current prototype against top competitors:

| Feature | AetherHealth | Teladoc | K Health | Hims & Hers | Amazon Clinic |
|---|---|---|---|---|---|
| Live video visits with licensed physician | Planned (UI only) | Yes | Yes | Yes | No (async) |
| Insurance billing / insurance acceptance | No | Yes | Partial | No | No |
| e-Prescribing integration (DoseSpot/Surescripts) | No | Yes | Yes | Yes | No |
| Lab ordering & results integration | No | Yes | Yes | Yes | Limited |
| Real clinician network (50-state coverage) | No | Yes | Yes | Yes | Yes |
| AI triage before consult | Prototype | Limited | Yes (core product) | Limited | No |
| Medication delivery / pharmacy integration | No | No | No | Yes (core) | No |
| Async messaging with provider | No | No | Yes | Yes | Yes |
| Multi-specialty in one platform | Yes (UI) | Yes | Limited | Yes | Limited |
| Wearable integration | UI only | No | No | No | No |
| Family accounts / dependents | No | Yes | No | Limited | No |
| Mental health medication management | No | Yes | No | Yes | No |
| Mobile app (iOS/Android) | No (web only) | Yes | Yes | Yes | Yes |
| HIPAA-compliant backend | No (static frontend) | Yes | Yes | Yes | Yes |

**Critical gaps for launch:** Live video infrastructure, real clinician network, e-prescribing, insurance billing, and a HIPAA-compliant backend are prerequisites for any real clinical operation. The current prototype demonstrates product design but lacks all clinical infrastructure layers.
