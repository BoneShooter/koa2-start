#!/usr/bin/env bash
set -o errexit

rm -rf target

rm -rf target.zip

cd server

npm run build

cd ..

cd web

npm run build

cd ..

mkdir target

cp -r ./server/build/ ./target/server

cp -r ./web/build/ ./target/client

cd ./target/server/src

npm install --productio

cd ../../..

zip -q -r target.zip target
