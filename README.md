# Notes App
Simple notes app

Open docker terminal:
docker exec -it --user developer notes-app_webapp_1 /bin/bash

Build
ionic build

You need to add android first:
ionic capacitor add android 
ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..
npx cap copy && cd android && ./gradlew assembleDebug && cd ..
Then your apk will be at:
android/app/build/outputs/apk/debug/app-debug.apk


Build for production:
Here is how to production build for Android:
ionic build --prod
npx cap copy

cd android && 
./gradlew assembleRelease && 
cd app/build/outputs/apk/release &&
jarsigner -keystore YOUR_KEYSTORE_PATH -storepass YOUR_KEYSTORE_PASS app-release-unsigned.apk YOUR_KEYSTORE_ALIAS &&
zipalign 4 app-release-unsigned.apk app-release.apk

This will generate app-release.apk which should be good to go the play store (see android/app/build/outputs/apk/release folder).
