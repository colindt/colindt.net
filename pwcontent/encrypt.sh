#!/bin/bash
gpg --no-use-agent -c --cipher-algo AES256 -a --yes $1
