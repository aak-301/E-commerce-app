#!/bin/bash
echo "Updating gradle.properties..."
cat > android/gradle.properties << EOL
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
android.useAndroidX=true
android.ndkVersion=25.1.8937393
reactNativeArchitectures=armeabi-v7a,arm64-v8a
newArchEnabled=false
hermesEnabled=true
EOL

echo "Cleaning project..."
cd android
./gradlew clean

echo "Building release APK..."
./gradlew assembleRelease --warning-mode all

echo "Copying APK to project root..."
if [ -f app/build/outputs/apk/release/app-release.apk ]; then
  cp app/build/outputs/apk/release/app-release.apk ../MiniEcommerceApp-release.apk
  echo "Successfully built APK: MiniEcommerceApp-release.apk"
else
  echo "Build failed or APK not found"
fi

cd ..