import { createSelector } from '@reduxjs/toolkit';
import { IEventsState } from './events.slice';

export const selectMedicalEvents = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.medicalEvents
);
export const selectCriminalEvents = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.criminalEvents
);
export const selectGoals = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.goals
);
export const selectMeta = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.meta
);
export const selectPrivateRecords = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.privateRecords
);
export const selectRelations = createSelector(
    (state: { events: IEventsState }) => state.events,
    (events) => events.relations
);
