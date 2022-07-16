import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import * as React from 'react'

import {ReactWidget, } from '@jupyterlab/apputils'

import {Panel} from '@phosphor/widgets'


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
        <ExampleComponent />
    );
  }
}

function ExampleComponent() {
  return(
    <body id='main'>
      <div className='jp-Examplewidget'><h2>SDocker</h2></div>
      <div>
        <h3>Instance Types:</h3>
          <ul><DockerHostRow instancetype="p3.2xlarge" /></ul>
      </div>

    </body>
  )
}

function DockerHostRow(props: any) {
  return(
    <li>
      <span className='info'>
        <span>Instance Type: {props.instancetype}</span>
      </span>
      <span>
        <button>Off</button>
      </span>
    </li>

  )
}

export default extension;
