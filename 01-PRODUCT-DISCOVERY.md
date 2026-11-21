# CampusFlow — Product Discovery

**Document:** `01-PRODUCT-DISCOVERY.md`  
**Status:** Draft — discovery hypotheses, not validated requirements  
**Version:** 0.1  
**Last updated:** 13 November 2026

---

## 1. Product overview

**CampusFlow** is a proposed academic coordination platform intended to help university students keep track of important academic information and obligations across their course units.

The initial product hypothesis is that CampusFlow can make academic information easier to publish, find, trust, organise and act on. Potential capabilities include structured announcements, an academic calendar and timely reminders. AI-assisted extraction of information from messages is a possible approach to investigate, not yet a committed feature.

**Working value proposition**

> CampusFlow helps students understand what they need to do academically and when they need to do it, while reducing repetitive communication work for class representatives.

**Working slogan:** Okoa Sem — Stay informed. Stay organised.

## 2. Problem statement

Academic information may reach students through several channels, including lecturers, class representatives, WhatsApp groups, email and learning-management systems.

In the workflow observed by the founder, lecturers often communicate information to class representatives, who then share it with students. Important announcements can become difficult to retrieve after more messages arrive. Students may have to scroll through long conversations or ask representatives to repeat information such as CAT dates, assignment deadlines and timetable changes.

Class representatives may also receive repeated questions through group chats and direct messages, including questions about information they have already shared. Managing announcements across several course units can add to this workload.

These observations suggest a possible coordination problem: important academic information is distributed through communication channels that are not always convenient for storing, retrieving, verifying and tracking academic obligations.

**Problem hypothesis**

> Students need a dependable way to find and keep track of important academic information across their units. Class representatives need a manageable way to publish that information without repeatedly answering the same questions.

This hypothesis requires validation with students, class representatives and lecturers.

## 3. Target users and stakeholders

### Primary users: students

Students are the initial primary user group.

Potential needs:
- Find current academic announcements without searching through long chat histories.
- Keep track of CATs, assignments, examinations and other academic obligations.
- Receive useful reminders before important activities.
- See which unit an announcement belongs to and whether information has changed.
- Understand whether information is confirmed or still awaiting verification.

### Secondary users: class representatives

Class representatives are an important information-publishing group.

Potential needs:
- Publish an announcement once for the relevant students.
- Organise information across multiple course units.
- Reduce repetitive questions about previously published information.
- Correct or update information and make changes visible to affected students.
- Avoid becoming the only place students can retrieve old announcements.

### Supporting stakeholders: lecturers

Lecturers may be authoritative sources for academic information and changes.

Potential needs:
- Communicate announcements and changes accurately.
- Reduce repetitive administrative communication.
- Ensure students can access the latest confirmed information.

Their willingness and ability to use CampusFlow directly are unknown and must be investigated.

### Other possible stakeholders

Department administrators and university management may become relevant if the product later requires institutional integration, official data sources or wider deployment. They are not assumed to be initial users or customers.

## 4. Current workflow and observed pain points

### Hypothesised information flow

1. A lecturer communicates academic information to a class representative.
2. The representative shares it with students, often through a WhatsApp group.
3. More messages arrive and the announcement becomes harder to find.
4. A student searches the conversation or asks the representative again.
5. If information changes, students may not notice the update or may continue relying on an older message.

### Potential pain points

| User | Potential pain point | Possible consequence |
|---|---|---|
| Student | Important information is buried in conversations | Time spent searching; missed or misunderstood information |
| Student | Information is spread across channels and units | Difficulty maintaining an overview of obligations |
| Student | A date changes but the old date remains in personal notes | Acting on outdated information |
| Class representative | Repeated questions about old announcements | Avoidable communication workload |
| Class representative | Information for multiple units is difficult to organise | More effort to publish and maintain updates |
| Lecturer | Repeated communication and clarification requests | Administrative overhead |

These are discovery observations and hypotheses, not yet measured findings.

## 5. Existing alternatives and the product gap to investigate

Students and staff may already use:
- WhatsApp groups and direct messages.
- Email.
- University learning-management systems.
- Timetables, noticeboards and class representatives.
- Personal calendars, notes and reminder applications.

CampusFlow should not assume these tools are incapable of providing announcements, calendars or reminders. The discovery task is to understand the actual gap.

Questions to investigate:
- Which tools are officially used for each type of academic information?
- Where do students look first when they need a CAT date or deadline?
- Can students retrieve old announcements easily?
- Are official LMS features available, understood and regularly used?
- Is the main problem missing functionality, fragmented channels, poor adoption, or the effort required to keep information current?
- Would students and representatives use another platform if it reduced enough work?

**Differentiation hypothesis:** CampusFlow could provide a structured, searchable and actionable academic information layer without requiring existing conversations to disappear or be replaced.

## 6. Proposed product direction

The proposed direction is a student-first academic coordination platform, with class representatives as important contributors of information.

Potential workflow to test:

1. An authorised person submits or forwards an academic announcement.
2. CampusFlow organises it by course unit, activity type and date.
3. If AI-assisted extraction is used, AI proposes structured details from the message.
4. The system checks the sender's permissions and the information's verification status.
5. An authorised person confirms important information or changes where required.
6. CampusFlow publishes the confirmed record and notifies affected students.
7. Students can view their academic calendar and receive reminders.

This is a proposed workflow for investigation. It is not a final architecture decision.

### Chat and AI are open product questions

An integrated chat interface may make it easier to capture information where communication already happens. However, building chat introduces additional work such as message storage, moderation, permissions, privacy, notifications and support.

An alternative is to let representatives forward or submit messages into a structured announcement workflow without building a full messaging platform.

AI may help identify units, dates, assessment types and proposed changes. However:

- Understanding a message does not prove that it is true.
- Reference data can improve interpretation but cannot establish a sender's authority by itself.
- AI-extracted changes should not silently overwrite authoritative academic records.
- Important changes need a clear confirmation process and an audit trail.

The pilot should test the workflow before committing to either a full chat system or a particular AI architecture.

## 7. Information authority, verification and change history

A central product risk is inaccurate or outdated academic information.

The product must distinguish between:
- **Unverified:** information has been submitted but not confirmed.
- **Pending confirmation:** a possible change has been extracted or proposed.
- **Verified:** an authorised source has confirmed the information.
- **Superseded:** an older record has been replaced by a newer confirmed record.

The precise authority rules must be agreed with the relevant academic community or institution. A possible starting hypothesis is that lecturers are authoritative for their assessments and class representatives may publish information under an agreed process. Student messages can provide context but should not automatically change official records.

For important changes, CampusFlow should preserve:
- The previous value and the new value.
- Who submitted and who confirmed the change.
- When the change was submitted and confirmed.
- The reason or source, where available.
- Which students were notified and when.

This history helps explain why a date changed and reduces the risk of silently presenting conflicting information.

## 8. MVP scope — provisional

The MVP should test the core coordination problem, not attempt to build every possible university workflow.

### Candidate MVP capabilities

- A way to organise students and academic information by course unit.
- A way for authorised representatives or staff to publish announcements.
- Structured records for important dates and academic activities.
- A student-facing calendar or obligations view.
- Reminders for confirmed upcoming activities.
- A visible status for information that is unverified, pending or confirmed.
- A way to update a record and communicate the change to affected students.

### Explicitly not committed to the first MVP

- A complete WhatsApp-style messaging platform.
- An autonomous AI agent that changes official dates without confirmation.
- Assignment submission, grading and feedback workflows.
- Plagiarism detection.
- Deep integration with university systems.
- Claims that CampusFlow can guarantee students will never miss an assessment.

These may be reconsidered only when discovery evidence supports them.

## 9. Assumptions and open questions

| ID | Assumption or question | How to investigate |
|---|---|---|
| A1 | Students struggle to retrieve important information from existing channels | Interview students; ask them to show how they find a recent announcement |
| A2 | Students want one organised view of obligations across units | Interview students; test a simple calendar prototype |
| A3 | Reminders help students act on academic information | Run a reminder pilot and measure delivery and reported action |
| A4 | Representatives experience repetitive questions and communication overhead | Interview representatives; record common repeated requests |
| A5 | Representatives would publish through CampusFlow if it reduced their workload | Test a simple publishing workflow and compare effort |
| A6 | Existing LMS tools do not fully solve the practical coordination problem | Map existing tools and observe actual usage before claiming a gap |
| A7 | Forwarding messages for AI extraction would be useful | Test manually first, then compare extraction accuracy and user effort |
| A8 | There is a workable authority model for confirming academic changes | Interview lecturers and representatives; document agreed rules |

## 10. Risks

| Risk | Why it matters | Possible mitigation |
|---|---|---|
| Incorrect dates or deadlines | Students may act on false information | Verification, source attribution and change history |
| Low representative adoption | The platform may lack reliable information contributors | Make publishing easier and demonstrate reduced repetitive work |
| Low student adoption | Students may not check another application | Deliver useful reminders and make retrieval genuinely easier |
| Duplicate work | Representatives may have to post in both WhatsApp and CampusFlow | Test forwarding and low-friction publishing |
| Notification failure | Students may not receive important reminders | Track delivery, provide an in-app calendar and avoid relying on one channel |
| Notification fatigue | Students may ignore frequent alerts | Give users control over reminder timing and frequency |
| AI extraction errors | Dates, units or changes may be misunderstood | Human confirmation for important records; test against real examples |
| Privacy and access issues | Academic communication may contain personal or sensitive information | Minimise data, define access permissions and establish retention rules |
| Scope expansion | Chat, grading and integrations could overwhelm the MVP | Keep the first release focused on information coordination |

## 11. Success measures

The product should be evaluated by whether it helps users complete real tasks, not only by registrations or app opens.

### Student outcomes
- Percentage of relevant reminders delivered successfully and on time.
- Percentage of students who can correctly retrieve a current announcement.
- Percentage of students who report knowing what academic activity requires their attention and when.
- Self-reported instances of avoiding a missed deadline because information was easier to find.
- Accuracy of confirmed dates and updates.

### Representative outcomes
- Time and effort required to publish an announcement.
- Number of repeated questions about information already published.
- Ability to manage announcements across multiple units.
- Representative willingness to continue using the workflow.

### Product health
- Schedule or announcement setup completion.
- Reminder delivery and failure rates.
- Number of records corrected because they were inaccurate.
- Continued use where it reflects genuine value.

App opens and registrations may help explain behaviour, but they are not sufficient evidence of product value. A student may receive a useful reminder without reopening the app.

## 12. Initial validation experiment

**Proposed pilot:** 30 students, 3 class representatives, 14 days.

This is a small learning experiment, not proof that the product will work across a university.

### Procedure

1. Recruit willing students and representatives from a small number of units.
2. Collect real announcements, deadlines and assessment dates through an agreed process.
3. Organise the information in a simple shared calendar or lightweight prototype.
4. Send reminders manually or with a basic existing tool.
5. Record corrections, missed updates, delivery failures and repeated questions.
6. Interview participants at the end of the pilot.

### What to learn

- Can students reliably find the information they need?
- Do reminders arrive accurately and at useful times?
- Do students feel more organised?
- Does the representative workflow reduce repeated questions or administrative effort?
- How often does information change, and how are changes communicated?
- What prevents participants from using the workflow?

Possible numerical targets should be agreed before the pilot begins and treated as provisional thresholds, not industry benchmarks.

## 13. Current product hypothesis

> CampusFlow aims to help university students keep track of important academic obligations by making academic information easier to publish, verify, retrieve and act on. It may also reduce repetitive communication work for class representatives.

### What we currently believe
- Important academic information can become difficult to retrieve in busy communication channels.
- Students may benefit from an organised view of academic obligations and useful reminders.
- Representatives may benefit from publishing information once and making it easy to retrieve later.
- Reliable information requires clear authority, verification and change history.

### What we have not yet proven
- That students will adopt another platform.
- That representatives will consistently publish through it.
- That a full chat interface is necessary.
- That AI extraction is sufficiently reliable or valuable.
- That existing LMS tools leave a meaningful unmet need.
- That students or institutions will pay for the product.

## 14. Immediate next steps

1. Interview students about how they currently find CAT dates, deadlines and timetable changes.
2. Interview class representatives about repeated questions and managing multiple units.
3. Speak with lecturers about how announcements and changes are authorised.
4. Map the existing LMS and communication workflows.
5. Run the 14-day manual pilot before committing to a full chat architecture.
6. Use the evidence to define the MVP requirements and architecture.

---

**Document note:** Keep this file updated as evidence is collected. Separate observed facts, interview findings, assumptions and decisions. Do not rewrite an untested hypothesis as a confirmed requirement.
