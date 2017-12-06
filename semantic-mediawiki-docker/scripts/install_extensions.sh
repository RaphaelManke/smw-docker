#!/usr/bin/env bash

# Config
basePath="mediawiki/extensions/"

cat $1 | \
    jq -r '.extensions[].url' | \
    while read URL
        do
            git clone $URL /var/www/html/extensions
        done
