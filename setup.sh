#!/bin/bash

jupyter labextension install . --minimize=False

supervisorctl -c /etc/supervisor/conf.d/supervisord.conf restart jupyterlabserver