#!/usr/bin/env bash
set -o errexit

# 当前路径
CURDIR=$(cd `dirname $0`; pwd)

SRCDIR=${CURDIR}/..

# rm
rm -rf ${SRCDIR}/build

# 编译
tsc -P ${SRCDIR}/tsconfig.json

cp ${SRCDIR}/package.json ${SRCDIR}/build/src/package.json

