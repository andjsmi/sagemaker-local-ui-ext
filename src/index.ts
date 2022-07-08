import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the sagemaker-ext extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'sagemaker-ext',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension sagemaker-ext is activated!');
  }
};

export default extension;
