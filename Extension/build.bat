@echo off
tsc --p "./TS background" && uglifyjs "./TS background/dist/background.js" -o ./public/background.js -c -m && npm run build
