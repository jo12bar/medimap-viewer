import React from 'react';
import OpenWaitTime from './OpenWaitTime';
import ClosedWaitTime from './ClosedWaitTime';
import AtCapacityWaitTime from './AtCapacityWaitTime';
import ErrorWaitTime from './ErrorWaitTime';

import {
  isMedimapOpenData,
  isMedimapClosedData,
  isMedimapAtCapacityData,
  isMedimapErrorData,
} from '../../medimap-data';

import withMedimapData, {
  WithMedimapDataPassedDownProps
} from '../WithMedimapData/WithMedimapData';

/**
* Displays the open / closed status and the wait time of a clinic, using data
* from electron's main process transmitted via ipc.
*/
const WaitTime: React.FC<WithMedimapDataPassedDownProps> = ({ msg }) => {
  if (msg === null) {
    // We haven't gotten any data yet.
    return <OpenWaitTime lastUpdated='a while ago' waitTime={0} />;
  }
  else if (isMedimapOpenData(msg)) {
    // Clinic is open and accepting patients.
    return <OpenWaitTime lastUpdated={msg.lastUpdated} waitTime={msg.waitTime} />;
  }
  else if (isMedimapClosedData(msg)) {
    // Clinic is closed.
    return <ClosedWaitTime />;
  }
  else if (isMedimapAtCapacityData(msg)) {
    // Clinic is open, but not accepting patients.
    return <AtCapacityWaitTime />;
  }
  else if (isMedimapErrorData(msg)) {
    // Some identifiable, main-process side error occurred.
    return <ErrorWaitTime errorMsg={msg.errorMsg} />;
  }
  else {
    // Something weird happened. Log the current state and say to check
    // the logs.
    console.error('Something weird happened. Current WaitTime msg prop is:', msg);
    return <ErrorWaitTime errorMsg='Something weird happened! Check the logs.' />;
  }
};

export default withMedimapData(WaitTime);
