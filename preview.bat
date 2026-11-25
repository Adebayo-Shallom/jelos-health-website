@echo off
REM Preview The Health Guardian website at http://localhost:8000
cd /d "%~dp0"
echo Website preview running at http://localhost:8000  (close this window to stop)
start "" http://localhost:8000
python -m http.server 8000
