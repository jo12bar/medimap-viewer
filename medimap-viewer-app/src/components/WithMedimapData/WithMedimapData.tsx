import { ipcRenderer } from 'electron';
import React from 'react';
import { Subtract } from 'utility-types';
import { MedimapData, isMedimapData } from '../../medimap-data';
import { getDisplayName } from '../../util/react-util';

export interface WithMedimapDataPassedDownProps {
  msg: MedimapData | null,
}

interface WithMedimapDataState {
  msg: MedimapData | null,
}

/**
 * Subscribes a component to electron ipc communications on the
 * 'medimap-new-data' channel. The prop `msg` on the passed-in component will
 * be the most recently recieved (and validated to be for medimap data) message.
 * The passed in component must implement WithMedimapDataPassedDownProps.
 */
function withMedimapData<T extends WithMedimapDataPassedDownProps>(
  Component: React.ComponentType<T>
) {
  return class WithMedimapData extends React.Component<
    Subtract<T, WithMedimapDataPassedDownProps>,
    WithMedimapDataState
  > {
    static displayName = `WithMedimapData(${getDisplayName(Component)})`;

    state: Readonly<WithMedimapDataState> = {
      msg: null,
    };

    private onIpcDataRecieved = (_e: any, msg: any) => {
      console.log(`${WithMedimapData.displayName} got msg:`, msg);
      if (isMedimapData(msg)) {
        this.setState({ msg });
      }
    }

    componentDidMount() {
      ipcRenderer.addListener('medimap-new-data', this.onIpcDataRecieved);
    }

    componentWillUnmount() {
      ipcRenderer.removeListener('medimap-new-data', this.onIpcDataRecieved);
    }

    render() {
      return <Component {...this.props as T} msg={this.state.msg} />
    }
  }
};

export default withMedimapData;
