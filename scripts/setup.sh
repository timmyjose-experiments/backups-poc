#/usr/bin/env bash

set -euxo pipefail

EAS_BUILD=${EAS_BUILD:-""}

echo "EAS_BUILD = ${EAS_BUILD}"


ANDROID_DIR=android
IOS_DIR=ios

if [[ "$@" == *"--platform-clean"* ]]; then
  (
    set +e
    echo "Removing android and ios directories.."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

if [[ "$@" == *"--clean"* ]]; then
  (
    set +e
    echo "Peforming full clean build..."
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "Removing android and ios directories..."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

yarn install

if [[ "${EAS_BUILD}" ]]; then
  cd android-kv-backup-agent
  yarn clean && yarn prepare
fi


if [[ ! -d "${ANDROID_DIR}" || ! -d "${IOS_DIR}" ]]; then
  echo "Missing android and/or directories. Performing prebuild..."
  npx expo prebuild
fi

