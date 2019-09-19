@echo off
echo Starting Shift Saver...
start chrome localhost
SET DEBUG=ShiftSaver:* & npm start
pause
