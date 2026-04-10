# AetherHealth Improvement Plan

## Current State
- Landing page (Index) with navigation + hero + stats + services + how-it-works
- Consultation page: basic chat with hardcoded static AI replies
- Dashboard page: static hardcoded data, tabs into HealthAnalytics/MedicalRecords/AppointmentScheduler/VitalSignsMonitor
- No localStorage persistence anywhere
- No real symptom triage logic
- No patient intake form

---

## Prioritized Improvements

### P1 — Patient Intake Form with localStorage persistence — `Sonnet 4.6 · Medium`
> **Recommended Model:** Sonnet 4.6 | **Effort:** High

**File:** `src/components/PatientIntakeForm.tsx` (new)  
**Problem:** No way to collect/store patient demographics, chief complaint, symptoms before a consultation.  
**Solution:** Multi-step form (name/age/sex → chief complaint → symptom checklist → severity) saved to `localStorage["aetherhealth_intake"]`. Prefill on subsequent visits.
   > **Model:** Sonnet 4.6 | **Effort:** Medium

### P2 — AI Symptom Triage (rule-based with severity scoring) — `Sonnet 4.6 · Medium`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/pages/Consultation.tsx` (lines 22–44)  
**Problem:** `handleSendMessage` always returns the same generic reply regardless of input.  
**Solution:** Replace static `setTimeout` reply with a `triageSymptoms()` function that pattern-matches keywords (chest pain → emergency, fever+cough → respiratory, rash → dermatology, etc.) and returns severity + recommended action + specialist type. Persist conversation to `localStorage["aetherhealth_chat"]`.
   > **Model:** Sonnet 4.6 | **Effort:** Medium

### P3 — Appointment Scheduling UI with real time-slot selection — `Sonnet 4.6 · Medium`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/components/AppointmentScheduler.tsx`  
**Problem:** File exists but likely has no interactive booking. Dashboard just renders it as a tab.  
**Solution:** Add provider list with specialty, a 7-day calendar grid showing available slots (9 AM–5 PM, exclude weekends), click-to-book that saves to `localStorage["aetherhealth_appointments"]`, and display booked appointments below.
   > **Model:** Sonnet 4.6 | **Effort:** Medium

### P4 — Vital Signs with real localStorage persistence — `Sonnet 4.6 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/components/VitalSignsMonitor.tsx` (lines 54–246)  
**Problem:** "Add Reading" dialog (line 199) doesn't actually save anything — no handler wired.  
**Solution:** Wire the Save Reading button to append to `localStorage["aetherhealth_vitals"]`, update `currentVitals` display from stored data, and rebuild the `vitalHistory` chart data from stored readings.
   > **Model:** Sonnet 4.6 | **Effort:** Low

### P5 — Medical History and Prescription persistence — `Sonnet 4.6 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/components/MedicalRecords.tsx` (lines 125–151)  
**Problem:** All data is hardcoded arrays.  
**Solution:** Load/save `medicalHistory`, `allergies` from `localStorage["aetherhealth_medical_history"]`. Add "Add Condition" and "Add Allergy" dialogs that persist new entries.
   > **Model:** Sonnet 4.6 | **Effort:** Medium

### P6 — Consultation → Dashboard data flow — `Sonnet 4.6 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/pages/Consultation.tsx`  
**Problem:** Consultation results never appear in the Dashboard.  
**Solution:** On consultation completion (Step 4), write a consultation record to `localStorage["aetherhealth_consultations"]`. Dashboard reads this key and renders it instead of hardcoded array.
   > **Model:** Sonnet 4.6 | **Effort:** Low

### P7 — Patient profile card on Dashboard — `Haiku 4.5 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** High

**File:** `src/pages/Dashboard.tsx` (lines 164–228)  
**Problem:** No patient identity shown; "Quick Actions" sidebar has no personalization.  
**Solution:** Read intake form data from `localStorage["aetherhealth_intake"]` and display name, age, chief complaint in the sidebar. Show "Complete Profile" prompt if not filled.
   > **Model:** Sonnet 4.6 | **Effort:** Low

### P8 — Real AppointmentScheduler wired to Dashboard upcoming appointments — `Haiku 4.5 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/pages/Dashboard.tsx` (lines 186–203)  
**Problem:** `upcomingAppointments` is hardcoded.  
**Solution:** Read from `localStorage["aetherhealth_appointments"]`, filter for future dates, show count badge.
   > **Model:** Sonnet 4.6 | **Effort:** Low

### P9 — Consultation step progression — `Haiku 4.5 · Low`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/pages/Consultation.tsx` (lines 162–170)  
**Problem:** Steps 1–4 progress bar is static badges, never advance.  
**Solution:** Track `consultationStep` state that advances after symptom collection (step 1→2), triage result (2→3), and treatment plan rendered (3→4).
   > **Model:** Sonnet 4.6 | **Effort:** Low

### P10 — Navigation active-link highlighting — `Haiku 4.5 · Trivial`
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**File:** `src/components/Navigation.tsx`  
**Problem:** No visual indication of current page.  
**Solution:** Use `useLocation()` to highlight active nav links with a blue underline/border.
   > **Model:** Haiku 4.5 | **Effort:** Medium
