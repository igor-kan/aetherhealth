# AetherHealth Legal Compliance Guide

**Last Updated:** April 2026  
**Applies To:** AetherHealth platform, including AI dermatology diagnosis features, telehealth services, and all PHI-handling components  
**Status:** REQUIRED READING for all engineering, product, and leadership team members

---

## CRITICAL SUMMARY

AetherHealth's AI dermatology feature **almost certainly constitutes a Software as a Medical Device (SaMD)** under FDA regulations and **requires 510(k) clearance before being marketed as a diagnostic tool**. Simultaneously, any feature that handles patient health information triggers HIPAA. Operating without clearance exposes the company to FDA warning letters, criminal liability, and app store removal. This guide tells you exactly what to do.

---

## Section 1: FDA Regulatory Requirements

### 1.1 What Is "Software as a Medical Device" (SaMD)?

The FDA defines SaMD as software intended to be used for one or more medical purposes that performs these purposes without being part of a hardware medical device. The key phrase is **"intended use"** — the FDA looks at how you describe, market, and design your product, not just what it technically does.

Under 21st Century Cures Act (2016), Congress distinguished between:

| Category | FDA Regulated? |
|----------|---------------|
| Software that diagnoses, treats, or prevents disease | YES — SaMD |
| Clinical Decision Support software used by clinicians that displays reasoning | Generally NO |
| Administrative software (scheduling, billing) | NO |
| General wellness software ("healthy lifestyle" claims only) | NO — if genuinely low-risk |

AetherHealth's AI dermatology feature — which analyzes photos of skin lesions and provides any form of assessment — **falls squarely into SaMD territory** if it uses language suggesting diagnosis, detection, or clinical assessment.

### 1.2 FDA's January 2025 Draft Guidance on AI/ML-Based SaMD

On January 6, 2025, the FDA published its Draft Guidance: "Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations." Key requirements introduced:

- **Transparency requirement:** Products must clearly state they use AI, describe model inputs/outputs, performance measures, and known bias sources.
- **Predetermined Change Control Plans (PCCPs):** Finalized December 2024, PCCPs allow manufacturers to specify in advance how an AI algorithm will be updated and monitored, avoiding full resubmission for each covered change.
- **Lifecycle management:** The FDA expects ongoing post-market monitoring, not just one-time clearance.
- **Reader studies:** For diagnostic AI, the FDA typically requires rigorous clinical studies comparing the AI against board-certified specialist panels — this constitutes 15–25% of total regulatory budget.

**Action required:** Assign a regulatory affairs lead to track finalization of this guidance. The final rule is expected in late 2025 or 2026.

### 1.3 How the FDA Would Classify AetherHealth's Dermatology Feature

**Feature: AI-powered skin lesion assessment from photos**

The FDA would analyze:
1. The stated intended use (your marketing copy, in-app descriptions, support documentation)
2. The indications for use (what conditions does it claim to address?)
3. The risk level to patients if the AI is wrong

**Most likely classification: Class II Medical Device**

- Class II devices pose moderate risk and typically require 510(k) clearance (substantial equivalence to a predicate device)
- The FDA cleared DermaSensor (January 2024) as the first AI-powered medical device for skin cancer detection for primary care settings — it detects melanoma, basal cell carcinoma, and squamous cell carcinoma
- DermaSensor is now an established **predicate device** for AI dermatology 510(k) applications

**Other relevant predicate devices:**
- DermaSensor (K231227 — cleared January 2024) — AI skin cancer detection
- SkinVision (European CE mark, used in US studies)
- Various computer-aided detection systems cleared under product code QMF

### 1.4 The 510(k) Pathway: What It Means and What It Costs

The 510(k) process requires demonstrating **substantial equivalence** to a legally marketed predicate device. You must show:
- The same intended use as the predicate; AND
- The same or different technological characteristics that do not raise new safety/effectiveness questions

**Timeline:**
- FDA standard review goal: 90 days (3 months)
- Real-world median: 172 days (~6 months)
- For AI devices with reader studies required: 12–18 months total (including pre-submission preparation)
- Best case: 98 days (documented cases exist)

**Costs (FY2025):**

| Item | Cost |
|------|------|
| FDA 510(k) filing fee (standard) | $24,335 |
| FDA 510(k) filing fee (small business, <$100M revenue) | $6,084 |
| Regulatory consultant / CRO support | $50,000–$150,000 |
| Clinical validation study (reader study) | $100,000–$400,000 |
| Legal and patent counsel | $20,000–$50,000 |
| Quality Management System setup (ISO 13485) | $30,000–$80,000 |
| **Total estimated range** | **$200,000–$700,000** |

**Pre-submission meeting (Q-Sub):** Before running an expensive clinical study, schedule a Q-Sub with FDA to agree on acceptance criteria. This is free and can save hundreds of thousands of dollars. Allow 3–4 months for FDA to schedule.

### 1.5 De Novo vs 510(k) vs PMA — Which Applies?

| Pathway | When to Use | Risk Level | Timeline | Cost |
|---------|-------------|------------|----------|------|
| **510(k)** | Predicate device exists (DermaSensor) | Class II | 6–18 months | $200K–$700K |
| **De Novo** | Novel device type, no predicate, moderate risk | Class I/II | 12–24 months | $300K–$1M |
| **PMA** | High-risk device, Class III | Class III | 3–7 years | $1M–$5M+ |

**For AetherHealth:**
- **AI dermatology diagnosis (skin cancer risk):** 510(k) using DermaSensor as predicate — most likely path
- **AI skin condition classifier (acne, eczema, rosacea identification):** 510(k) possible, or De Novo if no close predicate
- **Teledermatology platform connecting patients to doctors (no AI diagnosis):** NOT a device — platform only
- **Wellness/educational skin tips (no diagnostic claims):** NOT regulated if properly scoped

### 1.6 What AetherHealth Can Do WITHOUT 510(k) Clearance

The FDA does **not** regulate software that serves only general wellness purposes. You can operate these features today without clearance:

**Safe (if properly scoped):**
- Educational content about skin conditions (articles, videos, descriptions)
- "Skin journal" or photo logging without AI assessment
- Sun protection reminders and SPF recommendations
- Appointment booking with licensed dermatologists
- Connecting patients to doctors (platform, not diagnosis)
- Symptom tracking (logging without interpreting)

**NOT safe without clearance:**
- "Your lesion shows characteristics of melanoma"
- "This mole has a 78% probability of malignancy"
- "Based on this image, you may have basal cell carcinoma"
- "Your skin shows signs of Stage 2 rosacea"
- Risk scores or probability outputs tied to specific diagnoses

### 1.7 How to Word Features to Avoid FDA Jurisdiction

The FDA examines your **labeling** (which includes in-app text, marketing, website, support docs, push notifications). Safe language focuses on:

**Safe framing:**
- "Track changes in your skin over time"
- "This feature is for informational and educational purposes only"
- "Not intended to diagnose, treat, cure, or prevent any disease or medical condition"
- "This information does not replace the advice of a licensed healthcare provider"
- "Consult a board-certified dermatologist for any skin concerns"
- "This tool helps you document skin changes to share with your doctor"

**Dangerous framing (avoid entirely):**
- "AI-powered skin cancer detection"
- "Detect melanoma early"
- "Our AI identifies [specific condition]"
- "Clinically validated diagnosis"
- "Medical-grade analysis"

**Practical rule:** If a reasonable person reading your feature description would conclude the app is diagnosing or detecting a disease, the FDA will agree with them.

### 1.8 Prescription Software vs. Wellness App

The clearest line is **intended use**:

- A wellness app helps users track lifestyle factors, stay informed, and connect with care
- A prescription-use device analyzes patient-specific data to inform clinical decisions about diagnosis or treatment

Markers that push you toward "medical device" classification:
- Recommending specific drugs or treatments based on AI output
- Providing probability scores tied to named diseases
- Outputs designed to be used by clinicians to make diagnostic decisions
- Claims of clinical validation or accuracy statistics for specific conditions

### 1.9 Enforcement Risk of Not Getting 510(k)

Operating an uncleared medical device is a federal violation. Consequences:

- **FDA Warning Letters:** Public, damaging, require formal response within 15 business days
- **Injunctions:** FDA can seek federal court orders requiring immediate cessation
- **Criminal prosecution:** Knowing violations can result in misdemeanor charges; egregious violations can be felony charges (up to 3 years imprisonment)
- **App store removal:** Apple and Google have removed apps upon FDA requests
- **Investor liability:** If you've represented compliance status to investors incorrectly, securities issues arise
- **Civil litigation:** Injured patients can sue; lack of FDA clearance will be used against you in any lawsuit

---

## Section 2: HIPAA Requirements

### 2.1 Does AetherHealth Need to Be HIPAA Compliant?

**Yes, if any of the following exist:**

- AetherHealth has contracts with healthcare providers (covered entities)
- AetherHealth's platform handles Protected Health Information (PHI) on behalf of or in connection with a covered entity
- AetherHealth stores or transmits health information that identifies individuals
- Physicians use AetherHealth to communicate with their patients

PHI is **any individually identifiable health information** including:
- Photos submitted by users (facial or body images tied to a health inquiry)
- Skin condition descriptions, symptoms, diagnoses
- Name, email, address, date of birth when linked to health data
- Device IDs or IP addresses when tied to health data

**Bottom line:** AetherHealth almost certainly handles PHI if users submit health-related photos and personal information. Full HIPAA compliance is required.

### 2.2 HIPAA Privacy Rule Requirements

The Privacy Rule governs how PHI can be used and disclosed.

**Required actions:**
1. **Notice of Privacy Practices (NPP):** Provide a clear, plain-language privacy notice to all users explaining how their data is used. Must be available before or at first service delivery.
2. **Minimum necessary standard:** Only access, use, or disclose the minimum PHI needed for the specific purpose.
3. **Permitted uses:** PHI can be used for treatment, payment, and healthcare operations without additional authorization. Marketing and research require explicit consent.
4. **User rights:** Users must have the right to access their PHI, request corrections, and request an accounting of disclosures.
5. **No sale of PHI:** Never sell PHI without explicit HIPAA-compliant authorization.

### 2.3 HIPAA Security Rule

The Security Rule covers electronic PHI (ePHI). Requires three categories of safeguards:

**Administrative Safeguards:**
- Designate a Security Officer (can be same person as Privacy Officer at early stage)
- Conduct and document annual risk assessments
- Implement workforce training on HIPAA (documented, with sign-off)
- Establish policies for access management, incident response, and contingency planning
- Review access logs quarterly

**Physical Safeguards:**
- Workstation use policies (screen locks, clear-desk policy)
- Device and media disposal procedures (certified data wiping)
- Physical access controls to server rooms (if applicable)
- Documentation of all asset inventory containing ePHI

**Technical Safeguards:**
- Encryption at rest and in transit for all ePHI (AES-256 minimum)
- Unique user IDs — no shared logins for systems containing PHI
- Automatic session timeouts
- Audit logs for all access to ePHI
- Integrity controls (checksums, digital signatures)
- Transmission security (TLS 1.2+)

**Updated Security Rule (2024–2025):** HHS proposed updated Security Rule standards in January 2025. Full compliance is expected to be required by late 2026 or early 2027. Begin planning now.

### 2.4 HIPAA Breach Notification Rule

If ePHI is compromised, AetherHealth must:

| Notification | Deadline | Method |
|---|---|---|
| Affected individuals | 60 days after discovery | Written notice (mail/email) |
| HHS Secretary | 60 days after discovery (if >500 affected) | HHS online portal |
| HHS Secretary (small breaches, <500) | Within 60 days of end of calendar year | Annual report |
| Prominent media (if >500 in a state) | 60 days after discovery | Press release |

**What triggers the Breach Notification Rule:**
- Unauthorized access to systems containing ePHI
- Lost/stolen devices with unencrypted ePHI
- Ransomware affecting ePHI systems
- Unauthorized disclosure to wrong party

**Encryption safe harbor:** If ePHI was encrypted at the time of breach using NIST-approved methods, it may not constitute a reportable breach. This is a strong argument for robust encryption everywhere.

**Immediate response checklist:**
1. Contain the breach (revoke access, isolate systems)
2. Assess scope (what PHI, how many individuals?)
3. Engage legal counsel immediately
4. Document everything from discovery onward
5. Initiate notification process within 60 days

### 2.5 Business Associate Agreements (BAAs)

Every vendor who handles ePHI on your behalf must sign a BAA **before** data is shared with them. Operating without a BAA while sharing PHI is a direct HIPAA violation.

**Vendors that need BAAs (comprehensive list for AetherHealth):**

| Vendor Category | HIPAA-Ready Vendors | Vendors to Avoid Without BAA |
|---|---|---|
| Cloud hosting | AWS (BAA available), Google Cloud (BAA available), Azure (BAA available) | General hosting without BAA |
| Database | AWS RDS, Google Cloud SQL, Azure SQL Database | Firebase Realtime Database (BAA not available for Firebase) |
| Object storage | AWS S3 (BAA covered), Google Cloud Storage (BAA covered), Azure Blob | Firebase Storage (BAA not available) |
| Analytics | Mixpanel (BAA available), Amplitude (BAA available) | Google Analytics (no BAA for standard tier) |
| Email/communications | SendGrid (BAA available), Mailchimp (BAA available) | Standard consumer email services |
| Telehealth video | Twilio (BAA available), Daily.co (BAA available), Agora (BAA available) | Zoom (standard tier — use Zoom for Healthcare with BAA) |
| Error tracking | Sentry (BAA available) | Standard Sentry without PHI scrubbing |
| Customer support | Zendesk (BAA available) | Intercom (verify BAA status before using with PHI) |
| Auth/identity | Auth0/Okta (BAA available) | Standard consumer auth without BAA |
| Payment | Stripe (out of scope — no PHI) | — |

**Critical Firebase warning:** Firebase's standard terms do not include a BAA. If AetherHealth is using Firebase for any PHI storage or transmission, this must be migrated immediately. Google Cloud Platform (separate from Firebase) does support BAAs.

**BAA management:**
- Maintain a centralized BAA register (vendor name, date signed, expiry, contact)
- Review annually
- Ensure all team members know not to introduce new PHI-handling vendors without legal review

---

## Section 3: State Telehealth Laws

### 3.1 Fundamental Rule: Licensure Follows the Patient

The most important rule in telehealth law: **a physician must be licensed in the state where the patient is physically located at the time of the appointment.** Not where the doctor is located. Not where the company is headquartered.

This means:
- A California-licensed dermatologist on AetherHealth **cannot** see a patient located in Texas unless they also hold a Texas license
- AetherHealth's platform must capture and enforce patient state at the time of each encounter

### 3.2 Interstate Medical Licensure Compact (IMLC)

The IMLC offers an expedited pathway for physicians to obtain licenses in multiple member states. As of 2025, 40+ states participate.

**How it works:**
- Physicians apply through their home state
- Can be licensed in multiple member states simultaneously
- Faster and cheaper than individual state applications
- Does not work for controlled substance prescribing (still requires DEA registration in each state)

**AetherHealth recommendation:** Require all physicians on the platform to obtain IMLC licenses. Prominently display which states each physician is licensed to see patients in.

### 3.3 Online Prescribing

Online prescribing rules vary significantly by state:

| Category | Notes |
|---|---|
| Non-controlled substances | Most states allow prescribing based on a telehealth encounter alone |
| Controlled substances (Schedule II–V) | Requires DEA registration; most states require in-person examination or established relationship |
| DEA telemedicine rule (2023–2025) | Post-COVID relaxations remain in legal limbo; follow current DEA guidance carefully |
| Dermatology-specific (topicals, antibiotics) | Generally permissible without in-person visit in most states |

**Recommendation:** Consult a telehealth regulatory attorney before enabling any prescribing functionality. Prescribing violations carry significant professional and criminal liability for both the prescribing physician and potentially the platform.

### 3.4 State-Specific Telehealth Requirements

Some states have specific requirements beyond licensing:
- **Texas:** Requires a defined physician-patient relationship before prescribing; specific telehealth consent requirements
- **New York:** Specific telehealth informed consent requirements
- **California:** AB 1714 (2022) telehealth standards; specific requirements for synchronous vs asynchronous care

---

## Section 4: FTC Health Data Requirements

### 4.1 FTC Health Breach Notification Rule (Effective July 29, 2024)

The FTC's updated Health Breach Notification Rule (HBNR) applies to **health apps not covered by HIPAA** — meaning it catches consumer-facing apps that collect health data outside the traditional healthcare provider relationship.

**Who is covered:**
- Personal health record (PHR) vendors
- PHR-related entities (third-party applications that access PHR data)
- Health apps that collect health data and are not covered entities under HIPAA

**What constitutes a "breach" under the updated rule:**
- Traditional data security breaches (hacking, unauthorized access)
- **Also:** Unauthorized disclosures — sharing health data with third parties without proper authorization even if no security incident occurred

The updated 2024 rule explicitly covers **sharing user health data with advertising platforms, analytics services, or data brokers** if done without adequate consent. This means sharing skin photo data or health information with Facebook Pixel, Google Analytics, or ad networks is a potential HBNR violation.

**Notification obligations:**
- Notify affected users within 60 days
- Notify FTC within 60 days (if breach affects 500+ people, notify FTC at same time as users; if fewer than 500, notify FTC annually)

### 4.2 BetterHelp Settlement: Lessons for AetherHealth

In 2023, the FTC fined BetterHelp $7.8 million (the first settlement requiring consumer refunds for health data privacy violations). BetterHelp promised users that their health data would stay private, then shared it with Facebook, Snapchat, Criteo, and Pinterest for targeted advertising.

**Key lessons for AetherHealth:**
1. **Your privacy policy must accurately reflect your actual data practices.** If you say data is private, it must be.
2. **Using a health app's data for advertising is specifically targeted by FTC.** Skin photos, symptom descriptions, health histories cannot fuel ad targeting.
3. **Consent does not cure everything.** The FTC has taken the position that consent buried in terms of service is insufficient for sensitive health data sharing.
4. **Retroactive data use policy changes carry high risk.** You cannot grandfathering existing user data into new, broader uses without explicit re-consent.

### 4.3 What AetherHealth Must Never Do

- Share user health data (including anonymized or aggregated) with ad networks
- Use Facebook Pixel or Google Ads pixels on pages where health data is entered
- Share data with data brokers
- Use health data to build advertising profiles
- Share data with third-party analytics without confirming they will not use it for ad targeting

**Technical requirement:** Conduct a data flow audit. Map every data element, where it goes, and what every third party does with it. Document this. Review quarterly.

---

## Section 5: 12-Month Compliance Roadmap

### Month 1–2: Foundation and Assessment

**Priority actions:**
- [ ] Hire or designate a HIPAA Privacy Officer and Security Officer (can be combined role early-stage)
- [ ] Conduct a complete data flow audit — map all PHI, where it goes, and every third-party vendor
- [ ] Identify all BAA gaps (vendor list above) and begin obtaining BAAs
- [ ] Conduct a preliminary FDA product classification review with a regulatory consultant
- [ ] Immediately audit all in-app, website, and marketing copy for diagnostic language — remove or reword any language that could constitute an uncleared medical device claim
- [ ] Firebase audit: if PHI is in Firebase, begin migration plan to GCP/AWS with BAA

**Estimated costs:** $15,000–$30,000 (consultant fees, legal review)

### Month 2–3: Immediate Risk Mitigation

- [ ] Sign all outstanding BAAs — no exceptions
- [ ] Remove Facebook Pixel and any ad network tracking from health data pages
- [ ] Implement TLS 1.3 for all data transmission
- [ ] Implement AES-256 encryption at rest for all PHI
- [ ] Audit user access controls — implement role-based access, least privilege
- [ ] Deploy or strengthen audit logging for all PHI access
- [ ] Draft and publish compliant Notice of Privacy Practices
- [ ] Implement auto-session timeout on all interfaces handling PHI
- [ ] Add required FDA disclaimers to all AI skin analysis features

**Estimated costs:** $20,000–$50,000 (engineering, legal drafting)

### Month 3–6: FDA Pre-Submission Preparation

- [ ] Engage FDA regulatory consultant experienced in SaMD/AI medical devices
- [ ] Define exact intended use for each AI feature — document what is and is not making diagnostic claims
- [ ] Schedule Pre-Submission (Q-Sub) meeting with FDA to discuss classification and clearance pathway
- [ ] Begin ISO 13485 Quality Management System implementation (required for 510(k))
- [ ] Identify predicate device(s) — DermaSensor (K231227) as primary predicate
- [ ] Design clinical validation study with statistician and regulatory consultant

**Estimated costs:** $80,000–$150,000 (consultant, QMS implementation, study design)

### Month 4–6: HIPAA Program Build-Out

- [ ] Complete written HIPAA Risk Analysis and Risk Management Plan
- [ ] Develop and document all HIPAA policies and procedures (50+ required)
- [ ] Conduct workforce HIPAA training — document completion
- [ ] Implement HIPAA-compliant breach response procedures
- [ ] Establish Business Associate Agreement management process
- [ ] Conduct penetration test; remediate findings
- [ ] Begin annual security audit schedule

**Estimated costs:** $30,000–$60,000 (compliance program, pen test)

### Month 6–12: 510(k) Submission and Clearance

- [ ] Execute clinical validation reader study
- [ ] Complete 510(k) submission package (technical file, labeling, clinical data)
- [ ] Submit 510(k) to FDA
- [ ] Respond to FDA Additional Information requests during review
- [ ] While FDA is reviewing: implement post-market surveillance infrastructure
- [ ] Prepare PCCP (Predetermined Change Control Plan) for AI model updates

**Estimated costs:** $200,000–$500,000 (clinical study, submission preparation, FDA fee)

### Month 12+: Ongoing Compliance

| Activity | Frequency | Estimated Annual Cost |
|---|---|---|
| Annual HIPAA risk assessment | Annually | $10,000–$20,000 |
| Annual penetration test | Annually | $15,000–$30,000 |
| HIPAA workforce training | Annually | $5,000–$10,000 |
| BAA review and vendor audit | Annually | $5,000–$10,000 |
| FDA post-market surveillance reporting | As required | $10,000–$30,000 |
| Regulatory counsel retainer | Ongoing | $20,000–$60,000/yr |
| **Total annual maintenance** | | **$65,000–$160,000/yr** |

---

## Quick Reference: Do/Don't Matrix

| Action | OK? | Notes |
|---|---|---|
| Show educational content about skin conditions | YES | No diagnostic claims |
| Allow users to photograph and log moles | YES | Storage and tracking only |
| Say "AI detects skin cancer" | NO | Uncleared medical device claim |
| Connect users to licensed dermatologists | YES | Platform, not diagnosis |
| Share user photos with Facebook Pixel | NO | FTC/HIPAA violation |
| Use AWS with signed BAA for storage | YES | Ensure only HIPAA-eligible services |
| Use Firebase for PHI storage | NO | No BAA available |
| Prescribe without state license where patient is located | NO | Telehealth law violation |
| Display "educational only, consult a doctor" disclaimers | YES | Required, but not sufficient alone |

---

## Key Contacts and Resources

- **FDA Digital Health Center of Excellence:** dh@fda.hhs.gov
- **FDA Pre-Submission (Q-Sub) Program:** https://www.fda.gov/media/72419/download
- **HHS HIPAA guidance:** https://www.hhs.gov/hipaa/for-professionals/index.html
- **HHS Breach Notification Portal:** https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf
- **IMLC physician licensing:** https://www.imlcc.org/

---

*This document is for internal compliance planning purposes. It does not constitute legal advice. Consult qualified healthcare regulatory counsel before making compliance decisions.*
