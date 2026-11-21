"use client";

import { createContext, useContext, useState } from "react";
import {
  getUnitAnnouncements,
  MOCK_MESSAGES,
  MOCK_PERSONAL_OBLIGATIONS,
  MOCK_SHARED_EVENTS,
  MOCK_STUDY_SESSIONS,
} from "@/lib/mock-data";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [messagesByUnit, setMessagesByUnit] = useState(() => MOCK_MESSAGES);
  const [personalObligations, setPersonalObligations] = useState(
    () => MOCK_PERSONAL_OBLIGATIONS
  );
  const [completedSharedEventIds, setCompletedSharedEventIds] = useState(() =>
    MOCK_SHARED_EVENTS.filter((e) => e.status === "completed").map((e) => e.id)
  );
  const [studySessions, setStudySessions] = useState(
    () => MOCK_STUDY_SESSIONS
  );
  const [readAnnouncementIds, setReadAnnouncementIds] = useState(() => [
    "not-1",
  ]);

  function getMessages(unitId) {
    return messagesByUnit[unitId] ?? [];
  }

  function addMessage(unitId, body) {
    const trimmed = body.trim();
    if (!trimmed) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      unitId,
      authorLabel: "You",
      authorRole: "self",
      timestamp: "Just now",
      body: trimmed,
    };

    setMessagesByUnit((prev) => ({
      ...prev,
      [unitId]: [...(prev[unitId] ?? []), newMessage],
    }));
  }

  function getPersonalObligations(unitId) {
    if (!unitId || unitId === "all") return personalObligations;
    return personalObligations.filter((item) => item.unitId === unitId);
  }

  function togglePersonalObligation(obligationId) {
    setPersonalObligations((prev) =>
      prev.map((item) =>
        item.id === obligationId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function reschedulePersonalObligation(obligationId, newDueAt) {
    setPersonalObligations((prev) =>
      prev.map((item) =>
        item.id === obligationId
          ? {
              ...item,
              overdue: false,
              completed: false,
              dueAt: newDueAt || "Tomorrow, 6:00 PM",
              dueOrder: 2,
            }
          : item
      )
    );
  }

  function addPersonalObligation(unitId, { title, kind, dueAt, notes }) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newItem = {
      id: `per-${Date.now()}`,
      unitId,
      title: trimmedTitle,
      kind: kind || "Personal Task",
      dueAt: dueAt?.trim() || "Tomorrow, 5:00 PM",
      dueOrder: 1,
      notes: notes?.trim() || "Private personal reminder (demo).",
      overdue: false,
      completed: false,
    };

    setPersonalObligations((prev) => [newItem, ...prev]);
  }

  function isSharedEventCompleted(eventId) {
    return completedSharedEventIds.includes(eventId);
  }

  function toggleSharedEventCompleted(eventId) {
    setCompletedSharedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  }

  function getStudySessions(unitId) {
    if (!unitId || unitId === "all") return studySessions;
    return studySessions.filter((session) => session.unitId === unitId);
  }

  function addStudySession({ unitId, title, scheduledTime, duration }) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newSession = {
      id: `stu-${Date.now()}`,
      unitId,
      title: trimmedTitle,
      dayLabel: "Today",
      scheduledTime: scheduledTime?.trim() || "19:00–20:00",
      duration: duration?.trim() || "60 min",
      completed: false,
    };

    setStudySessions((prev) => [...prev, newSession]);
  }

  function toggleStudySession(sessionId) {
    setStudySessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  }

  function getUpcomingCount(unitId) {
    const sharedCount = MOCK_SHARED_EVENTS.filter(
      (event) =>
        !completedSharedEventIds.includes(event.id) &&
        (!unitId || unitId === "all" || event.unitId === unitId)
    ).length;

    const personalCount = personalObligations.filter(
      (item) =>
        !item.completed && (!unitId || unitId === "all" || item.unitId === unitId)
    ).length;

    return sharedCount + personalCount;
  }

  function isAnnouncementRead(announcementId) {
    return readAnnouncementIds.includes(announcementId);
  }

  function toggleAnnouncementRead(announcementId) {
    setReadAnnouncementIds((prev) =>
      prev.includes(announcementId)
        ? prev.filter((id) => id !== announcementId)
        : [...prev, announcementId]
    );
  }

  function markAllAnnouncementsRead(announcementIds) {
    setReadAnnouncementIds((prev) => {
      const next = new Set(prev);
      for (const id of announcementIds) {
        next.add(id);
      }
      return Array.from(next);
    });
  }

  function getUnreadAnnouncementCount(unitId) {
    const announcements = getUnitAnnouncements(unitId);
    return announcements.filter(
      (item) => !readAnnouncementIds.includes(item.id)
    ).length;
  }

  const value = {
    getMessages,
    addMessage,
    getPersonalObligations,
    togglePersonalObligation,
    reschedulePersonalObligation,
    addPersonalObligation,
    isSharedEventCompleted,
    toggleSharedEventCompleted,
    getStudySessions,
    addStudySession,
    toggleStudySession,
    getUpcomingCount,
    isAnnouncementRead,
    toggleAnnouncementRead,
    markAllAnnouncementsRead,
    getUnreadAnnouncementCount,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
