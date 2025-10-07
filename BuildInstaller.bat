
:: BuildInstaller.bat
:: Avvia lo script PowerShell con policy bypassata (più comodo per doppio clic)
@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0BuildInstaller.ps1" -AutoInstall
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Si e' verificato un errore durante la costruzione dell'installer.
  echo Apri PowerShell come amministratore e lancia:  powershell -ExecutionPolicy Bypass -File .\BuildInstaller.ps1
  pause
)
endlocal
