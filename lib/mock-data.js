/**
 * TEMPORARY MOCK DATA FOR THE CAMPUSFLOW UI SHELL (STEP 1)
 *
 * Guidelines followed:
 * - Clearly marked as demo data; no real student, lecturer, or institutional identities.
 * - Avoids personal information (no emails, registration numbers, or phone numbers).
 * - Preserves provenance fields (publisher role, timestamp) on shared unit events.
 * - Distinguishes official/shared unit events from private personal obligations.
 */

export const MOCK_UNITS = [
  {
    id: "ics-2201",
    code: "ICS 2201",
    title: "Data Structures & Algorithms",
    semester: "Demo Semester 2",
    unreadCount: 2,
    lastActivity: "10:14 AM",
  },
  {
    id: "sma-2101",
    code: "SMA 2101",
    title: "Calculus I",
    semester: "Demo Semester 2",
    unreadCount: 0,
    lastActivity: "Yesterday",
  },
  {
    id: "ics-2203",
    code: "ICS 2203",
    title: "Database Systems",
    semester: "Demo Semester 2",
    unreadCount: 1,
    lastActivity: "Mon",
  },
  {
    id: "hrd-2101",
    code: "HRD 2101",
    title: "Communication Skills",
    semester: "Demo Semester 2",
    unreadCount: 0,
    lastActivity: "Last week",
  },
];

export const MOCK_MESSAGES = {
  "ics-2201": [
    {
      id: "msg-101",
      unitId: "ics-2201",
      authorLabel: "Peer 1",
      authorRole: "student",
      timestamp: "09:42 AM",
      body: "Did anyone catch whether Lab 3 covers binary search trees or just linked lists?",
    },
    {
      id: "msg-102",
      unitId: "ics-2201",
      authorLabel: "Class Rep",
      authorRole: "class_rep",
      timestamp: "09:48 AM",
      body: "It covers linked lists and stacks only. Trees start next week.",
    },
    {
      id: "msg-103",
      unitId: "ics-2201",
      authorLabel: "You",
      authorRole: "self",
      timestamp: "09:55 AM",
      body: "Thanks! Are we submitting the code on the portal or in the lab session?",
    },
    {
      id: "msg-104",
      unitId: "ics-2201",
      authorLabel: "Class Rep",
      authorRole: "class_rep",
      timestamp: "10:05 AM",
      body: "Submit on the portal before Friday 5:00 PM. I have also updated the shared unit event so everyone has the exact time.",
    },
    {
      id: "msg-105",
      unitId: "ics-2201",
      authorLabel: "Peer 2",
      authorRole: "student",
      timestamp: "10:14 AM",
      body: "Got it, thank you.",
    },
  ],
  "sma-2101": [
    {
      id: "msg-201",
      unitId: "sma-2101",
      authorLabel: "Lecturer",
      authorRole: "lecturer",
      timestamp: "Yesterday, 2:10 PM",
      body: "Tutorial sheet 4 solutions have been uploaded. Please review question 3 before Thursday's class.",
    },
    {
      id: "msg-202",
      unitId: "sma-2101",
      authorLabel: "Peer 1",
      authorRole: "student",
      timestamp: "Yesterday, 3:05 PM",
      body: "Is CAT 1 still scheduled for next Tuesday?",
    },
    {
      id: "msg-203",
      unitId: "sma-2101",
      authorLabel: "Class Rep",
      authorRole: "class_rep",
      timestamp: "Yesterday, 3:18 PM",
      body: "Yes, Tuesday 8:00 AM in Lecture Hall B. Check the unit obligations page for the room details.",
    },
  ],
  "ics-2203": [
    {
      id: "msg-301",
      unitId: "ics-2203",
      authorLabel: "Class Rep",
      authorRole: "class_rep",
      timestamp: "Mon, 11:20 AM",
      body: "Group project topic proposals are due next Wednesday. Form groups of 3–4.",
    },
    {
      id: "msg-302",
      unitId: "ics-2203",
      authorLabel: "You",
      authorRole: "self",
      timestamp: "Mon, 11:45 AM",
      body: "Looking for one more person for our group if anyone is still unassigned.",
    },
  ],
  "hrd-2101": [
    {
      id: "msg-401",
      unitId: "hrd-2101",
      authorLabel: "Class Rep",
      authorRole: "class_rep",
      timestamp: "Last week",
      body: "No class this Friday; use the slot to prepare your group presentation outlines.",
    },
  ],
};

export const MOCK_SHARED_EVENTS = [
  {
    id: "evt-1",
    unitId: "ics-2201",
    title: "Lab 3: Linked Lists & Stacks Submission",
    kind: "Assignment",
    dueAt: "Fri, 5:00 PM",
    dueOrder: 2,
    locationOrChannel: "Learning Portal",
    notes: "Submit zipped source files. Demo data example.",
    publisherLabel: "Class Rep (Demo)",
    publisherRole: "class_rep",
    publishedAt: "Today, 10:04 AM",
    verificationState: "rep_published_unverified",
    status: "upcoming",
  },
  {
    id: "evt-2",
    unitId: "ics-2201",
    title: "CAT 1: Complexity & Linear Structures",
    kind: "CAT",
    dueAt: "Next Thu, 10:00 AM",
    dueOrder: 4,
    locationOrChannel: "Lab 2",
    notes: "Closed-book written assessment (45 minutes).",
    publisherLabel: "Lecturer (Demo)",
    publisherRole: "lecturer",
    publishedAt: "3 days ago",
    verificationState: "lecturer_published",
    status: "upcoming",
  },
  {
    id: "evt-5",
    unitId: "ics-2201",
    title: "Lab 2: Arrays & Pointers",
    kind: "Assignment",
    dueAt: "Completed · Tue",
    dueOrder: 0,
    locationOrChannel: "Learning Portal",
    notes: "Earlier lab submission.",
    publisherLabel: "Lecturer (Demo)",
    publisherRole: "lecturer",
    publishedAt: "Last week",
    verificationState: "lecturer_published",
    status: "completed",
  },
  {
    id: "evt-3",
    unitId: "sma-2101",
    title: "CAT 1: Limits & Differentiation",
    kind: "CAT",
    dueAt: "Tue, 8:00 AM",
    dueOrder: 3,
    locationOrChannel: "Lecture Hall B",
    notes: "Bring a non-programmable calculator.",
    publisherLabel: "Class Rep (Demo)",
    publisherRole: "class_rep",
    publishedAt: "Yesterday, 3:15 PM",
    verificationState: "rep_published_unverified",
    status: "upcoming",
  },
  {
    id: "evt-4",
    unitId: "ics-2203",
    title: "Group Project Topic Proposal",
    kind: "Assignment",
    dueAt: "Next Wed, 11:59 PM",
    dueOrder: 5,
    locationOrChannel: "Learning Portal",
    notes: "One submission per group (3–4 members).",
    publisherLabel: "Class Rep (Demo)",
    publisherRole: "class_rep",
    publishedAt: "Mon, 11:18 AM",
    verificationState: "rep_published_unverified",
    status: "upcoming",
  },
  {
    id: "evt-6",
    unitId: "ics-2203",
    title: "Database Systems End-of-Semester Exam",
    kind: "Exam",
    dueAt: "Fri 04 Dec, 9:00 AM",
    dueOrder: 6,
    locationOrChannel: "Exam Hall A",
    notes: "Provisional timetable slot (demo).",
    publisherLabel: "Lecturer (Demo)",
    publisherRole: "lecturer",
    publishedAt: "2 days ago",
    verificationState: "lecturer_published",
    status: "upcoming",
  },
];

export const MOCK_PERSONAL_OBLIGATIONS = [
  {
    id: "per-0",
    unitId: "ics-2201",
    title: "Complexity practice set",
    kind: "Personal Task",
    dueAt: "Was due Wed, 6:00 PM",
    dueOrder: -1,
    notes: "1 day overdue · Private practice checklist.",
    overdue: true,
    completed: false,
  },
  {
    id: "per-1",
    unitId: "ics-2201",
    title: "Revise linked lists before Lab 3",
    kind: "Study Session",
    dueAt: "Today, 4:00 PM",
    dueOrder: 1,
    notes: "Review doubly linked list edge cases (private).",
    overdue: false,
    completed: false,
  },
  {
    id: "per-4",
    unitId: "ics-2201",
    title: "Review Big-O notation",
    kind: "Personal Task",
    dueAt: "Completed · Yesterday",
    dueOrder: 0,
    notes: "Private study checklist.",
    overdue: false,
    completed: true,
  },
  {
    id: "per-2",
    unitId: "sma-2101",
    title: "Finish Tutorial Sheet 4 Question 3",
    kind: "Personal Task",
    dueAt: "Wed, 6:00 PM",
    dueOrder: 2,
    notes: "Private checklist item.",
    overdue: false,
    completed: false,
  },
  {
    id: "per-3",
    unitId: "ics-2203",
    title: "Confirm 4th group member for database project",
    kind: "Personal Task",
    dueAt: "Tue, 4:00 PM",
    dueOrder: 0,
    notes: "Follow up in unit chat.",
    overdue: false,
    completed: true,
  },
];

export const MOCK_STUDY_SESSIONS = [
  {
    id: "stu-1",
    unitId: "ics-2201",
    title: "Revise linked lists",
    dayLabel: "Today",
    scheduledTime: "16:00–17:00",
    duration: "60 min",
    completed: false,
  },
  {
    id: "stu-2",
    unitId: "sma-2101",
    title: "Calculus tutorial practice",
    dayLabel: "Today",
    scheduledTime: "18:30–19:15",
    duration: "45 min",
    completed: false,
  },
];

/**
 * Returns all joined unit offerings for the current demo student.
 */
export function getJoinedUnits() {
  return MOCK_UNITS;
}

/**
 * Returns a single unit offering by its URL slug/id, or null if not found.
 */
export function getUnitById(unitId) {
  return MOCK_UNITS.find((unit) => unit.id === unitId) ?? null;
}

/**
 * Returns the conversation messages for a given unit offering.
 */
export function getUnitMessages(unitId) {
  return MOCK_MESSAGES[unitId] ?? [];
}

/**
 * Returns both shared unit events and private personal obligations for a unit.
 */
export function getUnitObligations(unitId) {
  const sharedEvents = MOCK_SHARED_EVENTS.filter(
    (event) => event.unitId === unitId
  );
  const personalObligations = MOCK_PERSONAL_OBLIGATIONS.filter(
    (item) => item.unitId === unitId
  );

  return {
    sharedEvents,
    personalObligations,
  };
}

/**
 * Returns the count of upcoming shared events and incomplete personal obligations.
 * If unitId is omitted, counts across all joined units.
 */
export function getUpcomingObligationCount(unitId) {
  const sharedCount = MOCK_SHARED_EVENTS.filter(
    (event) =>
      event.status === "upcoming" && (!unitId || event.unitId === unitId)
  ).length;

  const personalCount = MOCK_PERSONAL_OBLIGATIONS.filter(
    (item) => !item.completed && (!unitId || item.unitId === unitId)
  ).length;

  return sharedCount + personalCount;
}

/**
 * General unit notices (timetable adjustments, room updates) that do not
 * duplicate due-date records in MOCK_SHARED_EVENTS.
 */
export const MOCK_NOTICES = [
  {
    id: "not-1",
    unitId: "ics-2201",
    title: "Thursday Lab Moved to Lab 2",
    kind: "Timetable",
    isImportant: false,
    body: "This week's practical session will be held in Lab 2 instead of Lab 1.",
    publisherLabel: "Class Rep (Demo)",
    publisherRole: "class_rep",
    publishedAt: "2 days ago",
    verificationState: "rep_published_unverified",
  },
  {
    id: "not-1b",
    unitId: "ics-2201",
    title: "Bring Student ID for Upcoming Lab Assessment",
    kind: "Important",
    isImportant: true,
    body: "Attendance will be recorded at the start of the practical session.",
    publisherLabel: "Lecturer (Demo)",
    publisherRole: "lecturer",
    publishedAt: "Yesterday, 4:30 PM",
    verificationState: "lecturer_published",
  },
  {
    id: "not-2",
    unitId: "sma-2101",
    title: "Tutorial Sheet 4 Solutions Uploaded",
    kind: "General",
    isImportant: false,
    body: "Please review question 3 before Thursday's tutorial.",
    publisherLabel: "Lecturer (Demo)",
    publisherRole: "lecturer",
    publishedAt: "Yesterday, 2:08 PM",
    verificationState: "lecturer_published",
  },
  {
    id: "not-3",
    unitId: "hrd-2101",
    title: "No Friday Lecture This Week",
    kind: "Timetable",
    isImportant: true,
    body: "Use the scheduled slot to prepare group presentation outlines.",
    publisherLabel: "Class Rep (Demo)",
    publisherRole: "class_rep",
    publishedAt: "Last week",
    verificationState: "rep_published_unverified",
  },
];

export const MOCK_RESOURCES = [
  {
    id: "res-1",
    unitId: "ics-2201",
    title: "Introduction to Data Structures",
    type: "Notes",
    category: "notes",
    weekId: "week-01",
    weekLabel: "Week 01 — Introduction",
    weekOrder: 1,
    description:
      "Course overview, abstract data types, and memory layout fundamentals.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "02 Nov 2026",
    addedTimestamp: "2026-11-02",
    fileMeta: "PDF · 10 pages · 1.2 MB",
  },
  {
    id: "res-2",
    unitId: "ics-2201",
    title: "Asymptotic Complexity & Big-O Guide",
    type: "PDF",
    category: "pdf",
    weekId: "week-02",
    weekLabel: "Week 02 — Complexity",
    weekOrder: 2,
    description:
      "Worked examples for time and space complexity analysis of loops and recursion.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "06 Nov 2026",
    addedTimestamp: "2026-11-06",
    fileMeta: "PDF · 8 pages · 940 KB",
  },
  {
    id: "res-3",
    unitId: "ics-2201",
    title: "Linked Lists: Lecture Notes",
    type: "Notes",
    category: "notes",
    weekId: "week-03",
    weekLabel: "Week 03 — Linked Lists",
    weekOrder: 3,
    description:
      "Singly, doubly, and circular lists with worked examples and complexity analysis.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "12 Nov 2026",
    addedTimestamp: "2026-11-12",
    fileMeta: "PDF · 12 pages · 1.8 MB",
  },
  {
    id: "res-4",
    unitId: "ics-2201",
    title: "Lab 3 Starter Instructions & Checklist",
    type: "PDF",
    category: "pdf",
    weekId: "week-03",
    weekLabel: "Week 03 — Linked Lists",
    weekOrder: 3,
    description:
      "Exercises on insertion, deletion, traversal, and portal submission requirements.",
    addedBy: "Class Rep (Demo)",
    publisherRole: "class_rep",
    addedAt: "13 Nov 2026",
    addedTimestamp: "2026-11-13",
    fileMeta: "PDF · 4 pages · 420 KB",
  },
  {
    id: "res-5",
    unitId: "ics-2201",
    title: "Starter Code · Lab 3",
    type: "Other",
    category: "other",
    weekId: "week-03",
    weekLabel: "Week 03 — Linked Lists",
    weekOrder: 3,
    description: "Source templates and test harness for linked-list exercises.",
    addedBy: "Class Rep (Demo)",
    publisherRole: "class_rep",
    addedAt: "14 Nov 2026",
    addedTimestamp: "2026-11-14",
    fileMeta: "ZIP · 6 files · 84 KB",
  },
  {
    id: "res-6",
    unitId: "ics-2201",
    title: "Stacks & Queues: Lecture Notes",
    type: "Notes",
    category: "notes",
    weekId: "week-04",
    weekLabel: "Week 04 — Stacks & Queues",
    weekOrder: 4,
    description:
      "Core operations, array vs. linked implementations, and practical uses.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "16 Nov 2026",
    addedTimestamp: "2026-11-16",
    fileMeta: "PDF · 14 pages · 2.1 MB",
  },
  {
    id: "res-7",
    unitId: "ics-2201",
    title: "Visualising Linked Lists, Stacks & Queues",
    type: "Link",
    category: "link",
    weekId: "week-04",
    weekLabel: "Week 04 — Stacks & Queues",
    weekOrder: 4,
    description:
      "Step through pointer and stack operations with interactive diagrams.",
    addedBy: "Class Rep (Demo)",
    publisherRole: "class_rep",
    addedAt: "16 Nov 2026",
    addedTimestamp: "2026-11-16",
    fileMeta: "External link · Demo reference",
  },
  {
    id: "res-8",
    unitId: "ics-2201",
    title: "Introduction to Trees Preview",
    type: "Notes",
    category: "notes",
    weekId: "week-05",
    weekLabel: "Week 05 — Trees",
    weekOrder: 5,
    description:
      "Terminology, binary trees, and traversal orderings ahead of next week's class.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "19 Nov 2026",
    addedTimestamp: "2026-11-19",
    fileMeta: "PDF · 9 pages · 1.4 MB",
  },
  {
    id: "res-9",
    unitId: "ics-2201",
    title: "CAT 1 Revision & Practice Sheet",
    type: "PDF",
    category: "pdf",
    weekId: "revision",
    weekLabel: "Revision & Practice",
    weekOrder: 99,
    description:
      "Sample questions covering Big-O complexity, linked lists, and stacks.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "20 Nov 2026",
    addedTimestamp: "2026-11-20",
    fileMeta: "PDF · 8 pages · 960 KB",
  },
  {
    id: "res-10",
    unitId: "sma-2101",
    title: "Tutorial Sheet 4 & Worked Solutions",
    type: "PDF",
    category: "pdf",
    weekId: "week-04",
    weekLabel: "Week 04 — Differentiation",
    weekOrder: 4,
    description: "Practice problems on limits and basic differentiation rules.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "18 Nov 2026",
    addedTimestamp: "2026-11-18",
    fileMeta: "PDF · 6 pages · 720 KB",
  },
  {
    id: "res-11",
    unitId: "ics-2203",
    title: "ER Diagramming Reference Guide",
    type: "Link",
    category: "link",
    weekId: "week-03",
    weekLabel: "Week 03 — Data Modeling",
    weekOrder: 3,
    description:
      "Concise notation reference for entity-relationship modeling.",
    addedBy: "Class Rep (Demo)",
    publisherRole: "class_rep",
    addedAt: "15 Nov 2026",
    addedTimestamp: "2026-11-15",
    fileMeta: "External link · Demo reference",
  },
  {
    id: "res-12",
    unitId: "hrd-2101",
    title: "Group Presentation Rubric & Template",
    type: "Other",
    category: "other",
    weekId: "week-02",
    weekLabel: "Week 02 — Presentations",
    weekOrder: 2,
    description:
      "Grading criteria and outline template for group presentations.",
    addedBy: "Lecturer (Demo)",
    publisherRole: "lecturer",
    addedAt: "10 Nov 2026",
    addedTimestamp: "2026-11-10",
    fileMeta: "DOCX · 3 pages · 310 KB",
  },
];

/**
 * Returns announcements for a unit by combining general notices with the unit's
 * shared academic events (avoiding duplicate event records).
 */
export function getUnitAnnouncements(unitId) {
  const notices = MOCK_NOTICES.filter((item) => item.unitId === unitId).map(
    (item) => ({
      ...item,
      isPinned: Boolean(item.isPinned),
      sourceType: "notice",
      dueAt: null,
      locationOrChannel: null,
    })
  );

  const eventAnnouncements = MOCK_SHARED_EVENTS.filter(
    (event) => event.unitId === unitId
  ).map((event, index) => ({
    id: `ann-${event.id}`,
    linkedEventId: event.id,
    unitId: event.unitId,
    title: event.title,
    kind: event.kind,
    isImportant: event.kind === "CAT",
    isPinned: index === 0,
    body: event.notes,
    dueAt: event.dueAt,
    locationOrChannel: event.locationOrChannel,
    publisherLabel: event.publisherLabel,
    publisherRole: event.publisherRole,
    publishedAt: event.publishedAt,
    verificationState: event.verificationState,
    sourceType: "shared_event",
  }));

  return [...eventAnnouncements, ...notices];
}

/**
 * Returns study resources (notes, PDFs, links) for a given unit offering.
 */
export function getUnitResources(unitId) {
  return MOCK_RESOURCES.filter((resource) => resource.unitId === unitId);
}
