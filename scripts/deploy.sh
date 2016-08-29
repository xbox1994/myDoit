#!/bin/bash

rm -rf /usr/share/thin/myDoit
mkdir -p /usr/share/thin/myDoit
/bin/tar -xvf /tmp/myDoit.tar -C /usr/share/thin/myDoit
cd /usr/share/thin/myDoit
killall ruby
bundle install
ruby web.rb