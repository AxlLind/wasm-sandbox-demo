#!/bin/bash
echo "Make sure you've committed everything you want to deploy."
git subtree push --prefix frontend heroku master
