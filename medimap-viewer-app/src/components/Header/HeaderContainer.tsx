import React from 'react';
import Header from './Header';

import { ipcRenderer } from 'electron';
import {
  isMedimapOpenData,
  isMedimapClosedData,
  isMedimapAtCapacityData,
} from '../../medimap-data';

interface HeaderContainerProps {
  clinicName: string,
  className: string,
}

interface HeaderContainerState {
  open: boolean,
}

class HeaderContainer extends React.Component<HeaderContainerProps, HeaderContainerState> {
  state: Readonly<HeaderContainerState> = {
    open: true,
  };

  private onIpcDataRecieved = (_e: any, msg: any) => {
    if (isMedimapOpenData(msg) || isMedimapAtCapacityData(msg)) {
      this.setState({ open: true });
    }
    else if (isMedimapClosedData(msg)) {
      this.setState({ open: false });
    }
  }

  componentDidMount() {
    ipcRenderer.addListener('medimap-new-data', this.onIpcDataRecieved);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('medimap-new-data', this.onIpcDataRecieved);
  }

  render() {
    const { clinicName, className } = this.props;
    const { open } = this.state;
    return <Header clinicName={clinicName} className={className} open={open} />;
  }
}

export default HeaderContainer;
