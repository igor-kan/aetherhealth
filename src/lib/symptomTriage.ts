/**
 * Rule-based symptom triage engine.
 * Returns urgency level, likely specialty, suggested actions, and a summary message.
 * No external API calls — pure deterministic logic for offline/no-API environments.
 */

export type UrgencyLevel = "emergency" | "urgent" | "routine" | "self-care";

export interface TriageResult {
  urgency: UrgencyLevel;
  urgencyLabel: string;
  urgencyColor: string;
  specialty: string;
  summary: string;
  suggestedActions: string[];
  keywords: string[];
}

interface TriageRule {
  keywords: string[];
  urgency: UrgencyLevel;
  specialty: string;
  summary: string;
  actions: string[];
}

const TRIAGE_RULES: TriageRule[] = [
  // EMERGENCY — life-threatening
  {
    keywords: ["chest pain", "chest pressure", "chest tightness", "heart attack", "crushing chest", "arm pain", "jaw pain"],
    urgency: "emergency",
    specialty: "Emergency Medicine / Cardiology",
    summary: "Your symptoms may indicate a cardiac event. This requires immediate emergency evaluation.",
    actions: [
      "Call 911 immediately or go to the nearest emergency room.",
      "Do not drive yourself.",
      "Chew aspirin 325mg if available and not allergic.",
      "Stay still and remain calm.",
    ],
  },
  {
    keywords: ["can't breathe", "cannot breathe", "trouble breathing", "shortness of breath", "difficulty breathing", "not breathing", "choking"],
    urgency: "emergency",
    specialty: "Emergency Medicine / Pulmonology",
    summary: "Severe breathing difficulty requires immediate emergency care.",
    actions: [
      "Call 911 immediately.",
      "Sit upright to ease breathing.",
      "Use your rescue inhaler if you have asthma.",
      "Do not wait — seek emergency care now.",
    ],
  },
  {
    keywords: ["stroke", "face drooping", "arm weakness", "speech difficulty", "sudden numbness", "severe headache sudden", "worst headache"],
    urgency: "emergency",
    specialty: "Emergency Medicine / Neurology",
    summary: "Your symptoms could indicate a stroke. Time is critical — brain tissue is at risk.",
    actions: [
      "Call 911 immediately. Use FAST: Face drooping, Arm weakness, Speech difficulty, Time to call.",
      "Note the time symptoms started.",
      "Do not give food or water.",
    ],
  },

  // URGENT — needs care within hours/same day
  {
    keywords: ["fever", "high temperature", "feverish", "temperature"],
    urgency: "urgent",
    specialty: "Internal Medicine / Family Medicine",
    summary: "A fever can indicate infection. Based on severity and duration, prompt evaluation is recommended.",
    actions: [
      "Check your temperature — if above 103°F (39.4°C) seek urgent care.",
      "Stay hydrated with water and electrolytes.",
      "Take acetaminophen or ibuprofen to reduce fever.",
      "Schedule same-day or next-day appointment if fever persists over 24 hours.",
    ],
  },
  {
    keywords: ["abdominal pain", "stomach pain", "belly pain", "severe stomach", "appendicitis", "right side pain", "lower right"],
    urgency: "urgent",
    specialty: "Internal Medicine / Gastroenterology",
    summary: "Abdominal pain, especially if severe or localized, warrants prompt evaluation.",
    actions: [
      "If pain is severe or in the lower right abdomen, seek urgent care or ER immediately.",
      "Avoid eating or drinking until evaluated.",
      "Track pain location, duration, and any associated nausea or vomiting.",
    ],
  },
  {
    keywords: ["allergic reaction", "hives", "swelling face", "throat swelling", "anaphylaxis", "epinephrine", "epipen", "bee sting"],
    urgency: "urgent",
    specialty: "Emergency Medicine / Allergy & Immunology",
    summary: "Allergic reactions can escalate quickly. If throat swelling or breathing difficulty occurs, call 911 immediately.",
    actions: [
      "If you have an EpiPen, use it immediately and call 911.",
      "Take oral antihistamine (diphenhydramine) if reaction is mild.",
      "Go to urgent care or ER — even mild reactions can worsen.",
    ],
  },

  // ROUTINE — see a doctor within days
  {
    keywords: ["cough", "coughing", "persistent cough", "dry cough", "wet cough", "productive cough"],
    urgency: "routine",
    specialty: "Family Medicine / Pulmonology",
    summary: "A cough combined with your other symptoms suggests a respiratory condition that should be evaluated.",
    actions: [
      "Schedule an appointment within 1–3 days if the cough persists.",
      "Stay hydrated and use honey or lozenges for throat relief.",
      "Avoid smoking and irritants.",
      "Seek earlier care if you develop fever above 101°F or blood in sputum.",
    ],
  },
  {
    keywords: ["rash", "skin rash", "hives", "itching", "eczema", "psoriasis", "skin irritation", "red skin"],
    urgency: "routine",
    specialty: "Dermatology",
    summary: "Skin conditions benefit from in-person evaluation to confirm diagnosis and prescribe treatment.",
    actions: [
      "Schedule a dermatology or primary care appointment.",
      "Avoid scratching to prevent infection.",
      "Keep the area clean and apply over-the-counter hydrocortisone for itching.",
      "Photograph the rash to track progression.",
    ],
  },
  {
    keywords: ["headache", "migraine", "head pain", "head pressure"],
    urgency: "routine",
    specialty: "Neurology / Family Medicine",
    summary: "Headaches are common but recurrent or severe ones should be evaluated.",
    actions: [
      "For tension headaches, try rest, hydration, and OTC pain relievers.",
      "Keep a headache diary (frequency, duration, triggers).",
      "Schedule an appointment if headaches are frequent, worsening, or affect daily life.",
      "Seek emergency care if this is the 'worst headache of your life' or comes with fever/stiff neck.",
    ],
  },
  {
    keywords: ["anxiety", "anxious", "panic", "panic attack", "stress", "mental health", "depression", "sad", "hopeless", "mood"],
    urgency: "routine",
    specialty: "Psychiatry / Psychology",
    summary: "Mental health concerns are important and treatable. A provider can offer a structured evaluation and support.",
    actions: [
      "Schedule a mental health evaluation within the week.",
      "Practice grounding techniques (box breathing, 5-4-3-2-1 sensory method).",
      "Reach out to the 988 Suicide & Crisis Lifeline (call or text 988) if having thoughts of self-harm.",
      "Consider therapy or counseling as a first-line option.",
    ],
  },
  {
    keywords: ["back pain", "lower back", "spine pain", "lumbar pain", "back ache"],
    urgency: "routine",
    specialty: "Orthopedics / Physical Therapy",
    summary: "Most back pain improves with conservative care. Evaluation helps rule out serious causes.",
    actions: [
      "Apply ice for the first 48 hours, then switch to heat.",
      "Take OTC anti-inflammatories (ibuprofen) as directed.",
      "Schedule an appointment if pain radiates down the leg or lasts more than 2 weeks.",
      "Gentle stretching and walking can help recovery.",
    ],
  },

  // SELF-CARE — manageable at home
  {
    keywords: ["runny nose", "cold", "sore throat", "sneezing", "stuffy nose", "congestion", "nasal"],
    urgency: "self-care",
    specialty: "Family Medicine",
    summary: "Your symptoms are consistent with a common cold or upper respiratory infection, which usually resolves on its own.",
    actions: [
      "Rest and stay hydrated.",
      "Use saline nasal spray or rinse for congestion.",
      "OTC decongestants and throat lozenges can ease symptoms.",
      "Seek care if symptoms worsen after 5–7 days or you develop fever above 101°F.",
    ],
  },
  {
    keywords: ["nausea", "upset stomach", "indigestion", "heartburn", "acid reflux", "bloating"],
    urgency: "self-care",
    specialty: "Gastroenterology / Family Medicine",
    summary: "Mild gastrointestinal symptoms can often be managed at home.",
    actions: [
      "Eat small, bland meals (crackers, rice, bananas, toast).",
      "Stay hydrated with clear fluids.",
      "OTC antacids or H2 blockers can help with heartburn.",
      "Seek care if vomiting persists more than 24 hours or you see blood.",
    ],
  },
  {
    keywords: ["diarrhea", "loose stools", "stomach bug", "gastroenteritis"],
    urgency: "self-care",
    specialty: "Gastroenterology / Family Medicine",
    summary: "Mild diarrhea is common and usually self-limiting.",
    actions: [
      "Drink plenty of fluids to prevent dehydration — electrolyte drinks are helpful.",
      "BRAT diet (Bananas, Rice, Applesauce, Toast) can settle your stomach.",
      "Avoid dairy and fatty foods temporarily.",
      "Seek care if symptoms last more than 3 days or you see blood in stool.",
    ],
  },
];

const DEFAULT_RESULT: TriageResult = {
  urgency: "routine",
  urgencyLabel: "Routine",
  urgencyColor: "bg-blue-100 text-blue-700 border-blue-200",
  specialty: "Family Medicine",
  summary: "Based on your description, I recommend scheduling a routine appointment for a full evaluation. Your healthcare provider can assess your symptoms in person.",
  suggestedActions: [
    "Schedule an appointment with your primary care provider.",
    "Keep track of your symptoms, when they started, and any changes.",
    "Note any medications you are currently taking.",
    "Bring a list of questions for your provider.",
  ],
  keywords: [],
};

const URGENCY_META: Record<UrgencyLevel, { label: string; color: string }> = {
  emergency: { label: "Emergency — Call 911", color: "bg-red-100 text-red-700 border-red-200" },
  urgent: { label: "Urgent — Seek Care Today", color: "bg-orange-100 text-orange-700 border-orange-200" },
  routine: { label: "Routine — Schedule Appointment", color: "bg-blue-100 text-blue-700 border-blue-200" },
  "self-care": { label: "Self-Care — Home Management", color: "bg-green-100 text-green-700 border-green-200" },
};

/**
 * Analyse a free-text symptom description and return a triage result.
 */
export function triageSymptoms(text: string): TriageResult {
  const lower = text.toLowerCase();

  // Score each rule by how many keywords match
  let bestRule: TriageRule | null = null;
  let bestScore = 0;

  for (const rule of TRIAGE_RULES) {
    const score = rule.keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore === 0) {
    return DEFAULT_RESULT;
  }

  const meta = URGENCY_META[bestRule.urgency];
  return {
    urgency: bestRule.urgency,
    urgencyLabel: meta.label,
    urgencyColor: meta.color,
    specialty: bestRule.specialty,
    summary: bestRule.summary,
    suggestedActions: bestRule.actions,
    keywords: bestRule.keywords.filter((kw) => lower.includes(kw)),
  };
}

/**
 * Generate a contextual AI follow-up message for the chat UI.
 */
export function generateAIResponse(userMessage: string, messageCount: number): string {
  const lower = userMessage.toLowerCase();

  if (messageCount === 1) {
    // First response — gather more info
    return "Thank you for sharing that. Can you tell me more about when these symptoms started, and would you rate their severity on a scale of 1 to 10? Also, have you taken any medications for this already?";
  }

  if (messageCount === 2) {
    // Second response — ask about associated symptoms
    return "I appreciate the additional detail. Are there any other symptoms accompanying this — such as fever, nausea, dizziness, or changes in appetite? Have you experienced anything like this before?";
  }

  // Subsequent responses — provide triage
  const result = triageSymptoms(userMessage);

  if (result.urgency === "emergency") {
    return `Based on what you've described, I need to flag this as potentially urgent. ${result.summary}\n\nI strongly recommend: ${result.suggestedActions[0]}\n\nPlease do not delay — this requires immediate attention. I am noting this for your care team.`;
  }

  const actionsText = result.suggestedActions.slice(0, 2).join(" Additionally, ");

  return `Based on your symptoms, this appears to be a ${result.urgencyLabel.toLowerCase()} situation that would best be handled by a ${result.specialty} provider.\n\n${result.summary}\n\nRecommended steps: ${actionsText}\n\nI've prepared a summary for the doctor's review. Would you like to schedule an appointment now?`;
}
