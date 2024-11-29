@echo off
set /p RESP="Delete node_modules and package-lock.json? (y/N): "

if /I "%RESP%"=="y" (
    echo deleting node_modules and package-lock.json
    del /f /q package-lock.json 2>nul
    rmdir /s /q node_modules 2>nul
    call npm cache clean --force 2>nul
)

echo re-installing npm modules
call npm install 2>nul

echo clearing metro cache
del %localappdata%Temphaste-map-* 2>nul
del %localappdata%Tempmetro-cache 2>nul

echo starting Expo
set APP_VARIANT=development
npx expo start -c