# CampusFlow --- Product Requirements

**Document:** `02-PRODUCT-REQUIREMENTS.md`\
**Version:** 0.1 --- Working draft\
**Status:** Draft for review\
**Product:** CampusFlow\
**Prepared:** 14 November 2026

------------------------------------------------------------------------

## 1. Purpose

This document translates the CampusFlow product-discovery hypotheses
into requirements for an initial usable release (MVP).

It describes what the product should enable, who can use it, the rules
it must follow, and how we will verify that the implementation works.

This is a working draft, not evidence that the product has been
validated. Requirements and priorities must be revisited after
interviews and a pilot with students and class representatives.

## 2. Product objective

CampusFlow aims to help university students organise, retrieve and stay
informed about their academic obligations through structured academic
information and timely reminders, while reducing repetitive
communication work for class representatives.

### 2.1 Primary outcome

A student can reliably answer:

> What academic obligation do I have, when is it due, and what do I need
> to do next?

### 2.2 Secondary outcome

A class representative can publish academic information once, make it
easy for students to retrieve later, and reduce repetitive questions
across multiple units.

## 3. Users and roles

  -----------------------------------------------------------------------
  Role                    Main needs              Initial
                                                  responsibilities
  ----------------------- ----------------------- -----------------------
  Student                 Know what is happening, Join units, view
                          find information, plan  announcements, manage
                          ahead and receive       personal obligations
                          reminders               and reminder
                                                  preferences

  Class representative    Communicate information Publish information for
                          once and reduce         authorised units,
                          repetitive requests     manage unit invitation
                                                  codes and maintain
                                                  announcements

  Lecturer                Communicate             Publish or confirm
                          authoritative academic  information where the
                          information             lecturer participates
                                                  in CampusFlow

  Administrator           Maintain a safe and     Manage accounts, roles
                          correctly configured    and platform-level
                          service                 settings
  -----------------------------------------------------------------------

**Important:** A class representative may be an authorised publisher
even when a lecturer does not personally post to CampusFlow. The product
must not assume that only lecturer-entered information is trustworthy.
The exact authority model must be agreed with the pilot institution or
class.

## 4. Product principles

1.  **Make obligations easy to understand.** Students should be able to
    find what they need to do and when.
2.  **Publish once, retrieve later.** Important academic information
    should not depend on scrolling through long chat histories.
3.  **Make the source visible.** Students should be able to see who
    published or changed an academic record.
4.  **Automate carefully.** AI may extract and organise information, but
    it must not invent facts or silently make uncertain, consequential
    changes.
5.  **Keep personal and shared information distinct.** A student's
    personal entry must not become a class-wide announcement.
6.  **Measure outcomes, not just activity.** Registrations and app opens
    are not sufficient evidence of usefulness.

## 5. Core user journeys

### 5.1 Student joins an academic unit

1.  The student creates an account or signs in.
2.  The student receives an invitation code from an authorised class
    representative.
3.  The student enters the code.
4.  CampusFlow validates the code and joins the student to the relevant
    unit or class.
5.  The student can see information published for that unit.
6.  The student can repeat the process for other units.

### 5.2 Representative publishes an academic event

1.  An authorised representative selects a unit they manage.
2.  The representative creates an event or announcement.
3.  The representative supplies the relevant details, such as title,
    activity type, date, time and description.
4.  CampusFlow records the publisher and publication time.
5.  Students joined to that unit can retrieve the information.
6.  Relevant students receive notifications according to their
    preferences.

### 5.3 Student creates a personal obligation

1.  The student opens their personal calendar or obligations list.
2.  The student creates an obligation, such as a study session or a
    personally tracked assignment deadline.
3.  The student supplies a title, date and any useful details.
4.  CampusFlow schedules reminders using the student's preferences.
5.  The entry remains personal unless the student separately uses an
    authorised publishing workflow.

### 5.4 An academic event changes

1.  An authorised publisher or supported communication workflow submits
    a change.
2.  CampusFlow identifies the existing event and the proposed new
    details.
3.  The system checks the source's permissions and whether the change is
    sufficiently clear.
4.  A clear, authorised change can be processed under the agreed rules;
    ambiguous or conflicting changes require confirmation.
5.  CampusFlow preserves the previous value and records who or what
    initiated the change and when.
6.  Affected students are notified, and their scheduled reminders are
    recalculated.

## 6. Functional requirements

Priority labels: - **Must:** required for the first usable MVP. -
**Should:** valuable, but can follow the first release if necessary. -
**Later:** deliberately outside the initial MVP.

  -----------------------------------------------------------------------
  ID                      Requirement             Priority
  ----------------------- ----------------------- -----------------------
  FR-01                   Students must be able   Must
                          to create an account    
                          and sign in securely.   

  FR-02                   Students must be able   Must
                          to join an academic     
                          unit using a valid      
                          invitation code.        

  FR-03                   Authorised              Must
                          representatives must be 
                          able to create and      
                          revoke invitation codes 
                          for units they manage.  

  FR-04                   Students must be able   Must
                          to view the academic    
                          units they have joined. 

  FR-05                   Authorised              Must
                          representatives must be 
                          able to publish         
                          announcements and       
                          academic events for     
                          units they manage.      

  FR-06                   Students must be able   Must
                          to view announcements   
                          and events for units    
                          they have joined.       

  FR-07                   Students must be able   Must
                          to create, edit and     
                          delete their own        
                          personal academic       
                          obligations.            

  FR-08                   CampusFlow must         Must
                          distinguish personal    
                          obligations from        
                          shared, unit-level      
                          information.            

  FR-09                   Shared academic records Must
                          must show their         
                          publisher and           
                          publication or update   
                          time.                   

  FR-10                   Students must be able   Must
                          to view upcoming        
                          obligations in a        
                          calendar or organised   
                          list.                   

  FR-11                   CampusFlow must         Must
                          schedule default        
                          reminders for relevant  
                          upcoming obligations.   

  FR-12                   Students must be able   Must
                          to customise their      
                          reminder preferences    
                          and manage reminders    
                          for individual          
                          obligations.            

  FR-13                   When a shared event     Must
                          changes, CampusFlow     
                          must update affected    
                          reminders and notify    
                          affected students.      

  FR-14                   CampusFlow must         Must
                          preserve a history of   
                          important changes to    
                          shared academic         
                          records.                

  FR-15                   The system must enforce Must
                          role- and unit-based    
                          permissions for         
                          publishing, editing and 
                          managing information.   

  FR-16                   Students must be able   Must
                          to identify the source  
                          and information status  
                          of a shared event.      

  FR-17                   Authorised lecturers    Should
                          must be able to publish 
                          or confirm academic     
                          information where the   
                          pilot workflow supports 
                          lecturer participation. 

  FR-18                   CampusFlow may use AI   Should
                          to extract structured   
                          academic information    
                          from submitted          
                          messages.               

  FR-19                   AI-assisted changes     Should
                          must be checked against 
                          source permissions and  
                          existing records;       
                          ambiguous or            
                          conflicting changes     
                          must be sent for        
                          confirmation rather     
                          than silently applied.  

  FR-20                   Students may receive a  Should
                          search function for     
                          finding older           
                          announcements and       
                          events.                 

  FR-21                   Integrated real-time    Later
                          chat between students,  
                          representatives and     
                          lecturers.              

  FR-22                   Assignment file         Later
                          submission, grading and 
                          lecturer feedback       
                          workflows.              

  FR-23                   AI tutoring or a        Later
                          general academic        
                          assistant.              
  -----------------------------------------------------------------------

**MVP boundary:** The initial release should prove that academic
information can be published, found, organised and turned into useful
reminders. Full chat and AI automation are not prerequisites for testing
that core value. The AI-assisted extraction workflow can be tested
separately before it becomes a Must requirement.

## 7. Reminder requirements

1.  CampusFlow must provide sensible default reminder timings.
2.  Students must be able to customise their default reminder schedule.
3.  Students must be able to adjust or disable reminders for an
    individual obligation.
4.  A change to an event's date or time must cause its future reminders
    to be recalculated.
5.  Affected students must receive a change notification when a shared
    event is updated.
6.  CampusFlow must avoid sending reminders for superseded dates.
7.  The system must record notification delivery outcomes where the
    notification provider makes that information available.

**Proposed default schedule for testing:** 7 days, 3 days and 1 day
before an event. These timings are provisional and should be evaluated
with students during the pilot.

## 8. Information authority and change handling

CampusFlow must distinguish between **who is allowed to publish** and
**whether a particular message is clear enough to update a record**.

-   An authorised lecturer can publish academic information for the
    relevant unit.
-   An authorised class representative can also publish information for
    the relevant unit, reflecting the real communication workflow in
    which lecturers often communicate through representatives.
-   Ordinary students can create personal entries. Student-submitted
    claims must not automatically overwrite shared academic records.
-   The publisher and change history must remain visible.
-   A change to an important date must be attributable to an authorised
    source.
-   AI can help interpret messages, identify likely changes and
    structure information. AI confidence alone does not establish that a
    message is authoritative.
-   Unclear statements, rumours, conflicting messages or uncertain event
    matches must be flagged for confirmation.
-   A changed event must retain its previous value in the history.

The product should not require lecturers to duplicate every announcement
in CampusFlow if an authorised representative is the agreed publisher
for that class.

## 9. Non-functional requirements

  -----------------------------------------------------------------------
  ID                                  Requirement
  ----------------------------------- -----------------------------------
  NFR-01                              **Security:** Users must only
                                      access information and perform
                                      actions permitted by their roles
                                      and unit memberships.

  NFR-02                              **Privacy:** Personal obligations
                                      and account details must not be
                                      exposed to other students without
                                      an explicit product reason and
                                      permission.

  NFR-03                              **Reliability:** The system must
                                      handle reminder scheduling and
                                      event updates consistently,
                                      avoiding duplicate or stale
                                      reminders where reasonably
                                      possible.

  NFR-04                              **Auditability:** Important
                                      shared-record changes must retain
                                      the actor, timestamp and previous
                                      and new values.

  NFR-05                              **Usability:** Core tasks---joining
                                      a unit, finding an event and adding
                                      a personal obligation---should be
                                      understandable to a first-time
                                      student.

  NFR-06                              **Performance:** Common views such
                                      as the student's upcoming
                                      obligations should load promptly
                                      under the expected pilot load.
                                      Exact targets will be set before
                                      implementation and tested.

  NFR-07                              **Maintainability:** Business rules
                                      for roles, event updates and
                                      reminders should be implemented in
                                      clearly separated, testable
                                      components.

  NFR-08                              **Accessibility:** Core workflows
                                      should be usable on common mobile
                                      screen sizes and should not rely on
                                      colour alone to communicate status.
  -----------------------------------------------------------------------

## 10. User stories and acceptance criteria

### US-01 --- Join a unit

**As a student,** I want to join a unit using an invitation code so that
I can access the correct academic information.

Acceptance criteria: - Given a valid, active code, when I submit it, I
am added to the corresponding unit. - Given an invalid, expired or
revoked code, the system rejects it and explains that it cannot be
used. - Reusing a code must follow its configured usage rules. - A
student cannot use a code to gain representative or lecturer
permissions.

### US-02 --- Publish an event

**As an authorised class representative,** I want to publish an academic
event for a unit so that students can find it later.

Acceptance criteria: - I can publish only to units I am authorised to
manage. - A published event includes the required title, unit and date;
time and description are included when applicable. - The event displays
who published it and when. - Students who have joined the relevant unit
can view it.

### US-03 --- Add a personal obligation

**As a student,** I want to add a personal obligation so that I can
track work that has not been published centrally.

Acceptance criteria: - I can create, edit and delete my own personal
entry. - The entry appears in my own obligations view. - It is not
presented as an official unit announcement. - Its reminders follow my
preferences.

### US-04 --- Receive reminders

**As a student,** I want reminders before an obligation so that I have
time to prepare.

Acceptance criteria: - Default reminders are scheduled for eligible
obligations. - I can customise my reminder preferences. - I can change
reminder settings for an individual obligation. - Disabling a reminder
prevents future scheduled reminders for that obligation.

### US-05 --- Handle an event change

**As a student,** I want to be notified when a shared academic event
changes so that I do not rely on an outdated date.

Acceptance criteria: - An authorised change updates the current event
record. - The previous date and relevant change details remain in the
history. - Affected students are notified. - Future reminders use the
new date and do not continue using the superseded date. - An ambiguous
or unauthorised change cannot silently overwrite the shared event.

### US-06 --- Reduce repetitive questions

**As a class representative,** I want students to retrieve previously
published information so that I do not have to repeatedly answer the
same questions.

Acceptance criteria: - Students can access the announcements for units
they have joined. - Announcements are organised so that older
information can be found. - Students cannot access restricted unit
information merely by guessing a unit identifier.

## 11. MVP scope

### Included in the first usable release

-   Secure account creation and sign-in.
-   Student and representative roles.
-   Unit membership through invitation codes.
-   Representative publishing of announcements and academic events.
-   Student personal obligations.
-   A calendar or upcoming-obligations view.
-   Default and configurable reminders.
-   Event change notifications.
-   Basic source attribution and change history.
-   Unit-scoped permissions.

### Excluded from the first usable release

-   Full real-time chat and direct messaging.
-   Assignment file submission and grading.
-   AI tutoring.
-   Complex university-system integrations.
-   Automatic interpretation of every conversation.
-   Automatic updates based only on unverified student messages.

AI-assisted message extraction remains a candidate for a controlled
experiment or later MVP increment. It should be added only after the
publishing, authority and change-handling rules are clear.

## 12. Success measures

The pilot should measure outcomes, not just registrations.

  -----------------------------------------------------------------------
  Measure                             What it tells us
  ----------------------------------- -----------------------------------
  Successful unit joins               Whether students can get into the
                                      right academic groups

  Reminder delivery success           Whether scheduled reminders reach
                                      students

  Reminder accuracy                   Whether reminders reflect the
                                      current event details

  Announcement retrieval success      Whether students can find
                                      information after it was published

  Student-reported preparedness       Whether students know what academic
                                      obligations are approaching

  Missed obligations attributed to    Whether the product may be reducing
  unavailable or buried information   the target problem

  Representative time and             Whether publishing once reduces
  repetitive-question burden          communication work

  Continued use and retention         Whether students and
                                      representatives continue to find
                                      value
  -----------------------------------------------------------------------

Provisional pilot targets should be agreed before the experiment. They
must not be presented as proven results or universal benchmarks.

## 13. Assumptions and open questions

The following points still require validation:

1.  Representatives are willing and authorised to publish information in
    a separate platform.
2.  Students will join units using invitation codes.
3.  Students find a central calendar and reliable reminders more useful
    than relying only on existing channels.
4.  The pilot group can agree on which representatives may publish for
    each unit.
5.  The institution's actual communication practices allow
    representatives to relay lecturer instructions.
6.  The best notification channels and reminder timings are not yet
    known.
7.  The exact lecturer-confirmation workflow needs to be agreed with
    pilot participants.
8.  AI extraction accuracy, ambiguity handling and the cost of human
    confirmation need to be tested.
9.  It remains to be established whether chat is necessary or whether
    structured announcements plus search solve the problem.

## 14. Risks and mitigations

  -----------------------------------------------------------------------
  Risk                                Initial mitigation
  ----------------------------------- -----------------------------------
  Representatives do not want another Test a low-friction submission
  publishing task                     workflow and measure representative
                                      effort

  Students do not join their units    Test invitation-code onboarding
                                      with real students

  Incorrect dates damage trust        Use authorised publishers, source
                                      attribution and change history

  AI misinterprets a conversation     Require permission checks and
                                      confirmation for ambiguous or
                                      consequential changes

  Too many notifications cause        Provide sensible defaults and user
  students to ignore them             controls

  Students enter incomplete personal  Make the source and personal nature
  schedules                           of entries clear; do not imply they
                                      are official

  The product becomes too large       Keep full chat, grading and
                                      tutoring outside the initial MVP
  -----------------------------------------------------------------------

## 15. Decisions recorded so far

  -----------------------------------------------------------------------
  Area                                Current decision
  ----------------------------------- -----------------------------------
  Primary user                        Students

  Secondary user                      Class representatives

  Supporting stakeholder              Lecturers

  Academic information entry          Hybrid: shared publishing plus
                                      personal student entries

  Unit onboarding                     Invitation codes

  Publisher model                     Authorised lecturers and authorised
                                      class representatives can publish

  Information traceability            Show publisher and retain important
                                      change history

  Reminders                           Hybrid: sensible defaults plus
                                      student customisation

  AI                                  Candidate for extraction and
                                      organisation, with authority and
                                      ambiguity safeguards

  Full chat                           Not committed to for the first
                                      usable release
  -----------------------------------------------------------------------

## 16. Next step

Review this document with a small number of students and class
representatives. Record what they confirm, challenge or reject. Then
revise the requirements before creating the architecture and technical
design documents.

**Engineering rule:** Do not begin implementation merely because a
requirement appears in this draft. First make sure its user value,
permissions, expected behaviour and acceptance criteria are sufficiently
clear.
