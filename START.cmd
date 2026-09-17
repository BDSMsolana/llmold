@echo off
cd /d "%~dp0"
echo LLMOLD local site: http://127.0.0.1:4179
echo Close this window to stop the local server.
python -m http.server 4179 --bind 127.0.0.1
pause
