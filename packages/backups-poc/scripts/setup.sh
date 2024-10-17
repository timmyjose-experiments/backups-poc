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

echo "Preparing the Android Key-Value Backup Agent plugin..."
yarn workspace android-kv-backup-agent clean
yarn workspace android-kv-backup-agent prepare


if [[ ! -d "${ANDROID_DIR}" || ! -d "${IOS_DIR}" ]]; then
  echo "Missing android and/or directories. Performing prebuild..."
  npx expo prebuild
fi

