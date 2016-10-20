#!/usr/bin/env bash
pid=`ps aux | grep upload_start | grep -v root | grep -v grep | awk '{print $2}'`
if [ ! -z "$pid" ]
then
    kill $pid
    echo kill process success
else
    echo no process found
fi