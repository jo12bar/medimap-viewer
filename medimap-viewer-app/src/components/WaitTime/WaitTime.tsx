import React from 'react';
import OpenWaitTime from './OpenWaitTime';
import * as medimapData from '../../medimap-data';

interface WaitTimeState {
  lastMsg: medimapData.MedimapData | null,
}

/**
 * Displays the open / closed status and the wait time of a clinic, using data
 * from electron's main process transmitted via ipc.
 */
class WaitTime extends React.Component<{}, WaitTimeState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      lastMsg: null,
    }
  }

  render() {
    const { lastMsg } = this.state;

    if (lastMsg === null) {
      // We haven't gotten any data yet.
      return <OpenWaitTime lastUpdated='a while ago' waitTime={0} />
    }
    else {
      // TODO: Replace the below with an error component!
      return <OpenWaitTime lastUpdated='I dunno. Something weird is going on.' waitTime={-Infinity} />
    }
  }
}

export default WaitTime;
