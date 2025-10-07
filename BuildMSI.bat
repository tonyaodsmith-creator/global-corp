
@echo off
:: BuildMSI.bat - crea e lancia l'MSI con un doppio clic
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0BuildMSI.ps1" -AutoInstall
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Si e' verificato un errore durante la creazione MSI.
  echo Apri PowerShell come amministratore e lancia:  powershell -ExecutionPolicy Bypass -File .\BuildMSI.ps1
  pause
)
