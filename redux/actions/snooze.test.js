// -----------------------------------------------------------------------------------------
// ------------------------------------- Local Imports -------------------------------------
// -----------------------------------------------------------------------------------------

import { snoozeTicket } from "./snooze.js";

// -----------------------------------------------------------------------------------------
// ----------------------------------------- Tests -----------------------------------------
// -----------------------------------------------------------------------------------------


const sampleSnooze = {
  "start": 1598989241733,
  "end": 1599000041733,
  "duration": "3 hour"
}

const sampleTicketId = "5f3ac34c0c0df0004c39f7fd";

const expectedAction = {
  "type": 'SNOOZE_TICKET',
  "snooze": sampleSnooze,
  "ticketId": sampleTicketId
};


describe('snoozeTicket', () => {
  it('should create an action to add a snooze to a ticket', () => {
    expect(snoozeTicket(sampleSnooze, sampleTicketId)).toEqual(expectedAction);
  });
});