/* 
 *  Copyright (c) 2020 Synapse Financial Technologies, Inc. -- All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited.
 *  Proprietary and confidential.
 */

// -----------------------------------------------------------------------------------------
// ------------------------------------ Alert Level Actions --------------------------------
// -----------------------------------------------------------------------------------------

/**
 * 
 * @param {object} snooze 
 * snooze: {
 *   start: **milliseconds**
 *   end: **milliseconds**
 * }
 */
export const snoozeTicket = (snooze, ticketId) => {
  const action = {
    //source: InfoHeader.js
    //destination: chatboxSagas.js
    type: 'SNOOZE_TICKET',
    snooze,
    ticketId,
  };
  return action;
};
