import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import * as React from 'react'

import {ReactWidget, } from '@jupyterlab/apputils'

import {Panel} from '@phosphor/widgets'

import Tabs from './Tabs'
import Tab from './Tab'

import { requestAPIServer } from './RequestAPI';


// import {exec} from 'child_process'

import Menu from './components/Menu'

let active_instance_id: any = null


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
  panel.title.iconClass = "AAAA"
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
        <Tab title="Hosts"> <CreateHost /> <table><tbody><HostsComponent /></tbody></table> </Tab>
        <Tab title='Images'><ImagesComponent instance_id={active_instance_id} /></Tab>
        <Tab title="Containers"><ContainersComponent instance_id={active_instance_id} /></Tab>
      </Tabs>

    </body>
  )
}

function ImagesComponent(props: any) {
  const dataToSend={
    "instance_id": props.instance_id
  }
  if (props.instance_id !== null) {
    try {
      const reply = requestAPIServer("images", {
        method: "POST",
        body: JSON.stringify(dataToSend)
      })
      console.log(reply)
      return (
        <div>Getting images</div>
      )
    }
    catch (reason) {
      console.error(`Error on POST /docker-host/images.\n${reason}`)
      return(
        <div>Could not get images</div>
      )
    }
  } else {
    return(
      <div>Did not have instance assigned as active</div>
    )
  }
}

function ContainersComponent(props: any) {
  const dataToSend={
    "instance_id": props.instance_id
  }
  if (props.instance_id !== null) {
    try {
      const reply = requestAPIServer("containers", {
        method: "POST",
        body: JSON.stringify(dataToSend)
      })
      console.log(reply)
      return (
        <div>Getting images</div>
      )
    }
    catch (reason) {
      console.error(`Error on POST /docker-host/containers.\n${reason}`)
      return(
        <div>Could not get images</div>
      )
    }
  } else {
    return(
      <div>Did not have instance assigned as active</div>
    )
  }
}

function HostsComponent() {
  /**
   * This needs to get all Hosts and then show them in a list.
   * 
   * 
   */


  try {
    const reply = requestAPIServer("contexts", {
      method: "GET"
    })
    console.log(reply)
  }
  catch (reason) {
    console.error(`Error on GET /docker-host/contexts.\n${reason}`)
  }
  

  const instances = [
    ['p3.2xlarge', 'i-23123123', 'active-host', "Running"],
    ['m5.4xlarge', 'i-abcd', 'not-active-host', "Terminating"]
  ]
  active_instance_id = 'i-23123123'


  return(
    <> {
      instances.map( (item: Array<String>, i) =>
        <DockerHostRow instancetype={item[0]} instanceid={item[1]} contextstatus={item[2]} state={item[3]}/>
      )
    }</>
  )
}

function CreateHost(props: any) {

  return(
    <Menu />

  )
}






function DockerHostRow(props: any) {
  // const pauseButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, instanceID: String) => {
  //   console.log("Stopping EC2 instance with ID ", instanceID)
  // }

  const stopButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>, instanceID: String) => {
    //console.log(event)
    console.log("Terminating EC2 instance with ID ", instanceID)

    const dataToSend = {
      "instance_id": instanceID
    }
    try {
      const reply = requestAPIServer("contexts", {
        method: "POST",
        body: JSON.stringify(dataToSend)
      })
      console.log(reply)
    }
    catch (reason) {
      console.error(`Error on POST /docker-host/terminate_host.\n${reason}`)
    }

  }
  
  return(
    <tr>
      <span className='info'>
        <span>Instance Type: {props.instancetype}</span>
      </span>
      <span>
        <span className={props.contextstatus}></span>
        <span className="State">{props.state}</span>
        {/* <button onClick={event=> pauseButtonClickHandler(event, props.instanceid)}>II</button> */}
        <button onClick={event => stopButtonClickHandler(event, props.instanceid)}>X</button>
      </span>
    </tr>

  )
}

export default extension;
