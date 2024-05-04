import { createSelector } from '@reduxjs/toolkit';
import { IMedEvent, ICriminalEvent } from '../models/events';
import { IGoal, IMeta, IPrivateRecord, IRelation } from '../models/user';
import { addLockData } from '../shared/utils/addLockData';
import { IEventsState } from './events.slice';
import { selectRevealCodes } from './users.selectors';

export const selectMedicalEvents = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const medEvents = events.medicalEvents;
        return medEvents && revealCodes
            ? addLockData<IMedEvent>(medEvents, revealCodes)
            : medEvents;
    }
);
export const selectCriminalEvents = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const criminalEvents = events.criminalEvents;
        return criminalEvents && revealCodes
            ? addLockData<ICriminalEvent>(criminalEvents, revealCodes)
            : criminalEvents;
    }
);
export const selectGoals = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const goals = events.goals;
        return goals && revealCodes
            ? addLockData<IGoal>(goals, revealCodes)
            : goals;
    }
);
export const selectMeta = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const meta = events.meta;
        return meta && revealCodes
            ? addLockData<IMeta>(meta, revealCodes)
            : meta;
    }
);
export const selectPrivateRecords = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const privateRecords = events.privateRecords;
        return privateRecords && revealCodes
            ? addLockData<IPrivateRecord>(privateRecords, revealCodes)
            : privateRecords;
    }
);
export const selectRelations = createSelector(
    (state: { events: IEventsState }) => state.events,
    selectRevealCodes,
    (events, revealCodes) => {
        const relations = events.relations;
        return relations && revealCodes
            ? addLockData<IRelation>(relations, revealCodes)
            : relations;
    }
);
