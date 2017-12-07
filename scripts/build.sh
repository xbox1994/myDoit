#!/usr/bin/env bash
grunt build
rm -rf dist
mkdir dist
tar -cvf dist/myDoit.tar Gemfile Gemfile.lock views config.yml web.rb
