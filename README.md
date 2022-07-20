# sdocker-ui

![Github Actions Status](https://github.com/my_name/myextension/workflows/Build/badge.svg)

A JupyterLab extension for SageMaker Studio to implement a visual interface for using local mode. This also requires the [sdocker](https://github.com/samdwar1976/sdocker) package and the [sdocker-server](https://github.com/samdwar1976/sdocker-server) extension.

This creates a new element in the sidebar that allows a user to create, terminate and view the current Docker hosts for executing Docker commands from the Studio UI.


## Requirements

* JupyterLab >= 1.0

## Install

```bash
git clone http://github.com/andjsmi/sdocker-ui
cd sdocker-ui

jupyter labextension install . --minimize=False
nohup supervisorctl -c /etc/supervisor/conf.d/supervisord.conf restart jupyterlabserver
```

## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to sagemaker-ext directory
# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension link .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

### Uninstall

```bash
jupyter labextension uninstall sagemaker-ext
```

