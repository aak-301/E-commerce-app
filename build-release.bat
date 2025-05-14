@echo off
echo Updating gradle.properties...
(
echo org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
echo android.useAndroidX=true
echo android.ndkVersion=25.1.8937393
echo reactNativeArchitectures=armeabi-v7a,arm64-v8a
echo newArchEnabled=false
echo hermesEnabled=true
) > android\gradle.properties

echo Cleaning project...
cd android
call ./gradlew clean

echo Building release APK...
call ./gradlew assembleRelease --warning-mode all

echo Copying APK to project root...
if exist app\build\outputs\apk\release\app-release.apk (
  copy app\build\outputs\apk\release\app-release.apk ..\MiniEcommerceApp-release.apk
  echo Successfully built APK: MiniEcommerceApp-release.apk
) else (
  echo Build failed or APK not found
)

cd ..