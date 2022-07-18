import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import * as React from 'react'

import {ReactWidget, } from '@jupyterlab/apputils'

import {Panel} from '@phosphor/widgets'

import Tabs from './Tabs'
import Tab from './Tab'

import { exec } from "child_process";


/**
 * Initialization data for the sagemaker-ext extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'sagemaker-ext',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    addSidebar(app)
    console.log('JupyterLab extension sagemaker-ext is activated!');
  }
};

// Create item and add it to left sidebar of JupyterLab
function addSidebar(app: any) {
  const panel = new Panel();
  panel.id = "SDocker";
  panel.title.icon = "AA"
  panel.addWidget(new SDockerWidget());
  app.shell.add(panel, 'left')
}

export class SDockerWidget extends ReactWidget {
  _label:string;
  render(): JSX.Element {
    return (
        <MainComponent />
    );
  }
}

function MainComponent() {
  return(
    <body id='main'>
      <div className='jp-Mainwidget'><h2>SDocker</h2></div>
      <Tabs>
        <Tab title="Hosts"> <HostsComponent /> </Tab>
        <Tab title='Images'>Nothing here yet</Tab>
        <Tab title="Containers">No content yet</Tab>
      </Tabs>

    </body>
  )
}

function HostsComponent() {
  /**
   * This needs to get all Hosts and then show them in a list.
   * 
   */


  return(
    <table>
      <tbody>


        <DockerHostRow instancetype='p3.2xlarge' />

      </tbody>
    </table>

  )
}

function DockerHostRow(props: any) {
  return(
    <tr>
      <span className='info'>
        <span>Instance Type: {props.instancetype}</span>
      </span>
      <span>
        <button>Off</button>
      </span>
    </tr>

  )
}

export default extension;
