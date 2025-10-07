
# BuildInstaller.ps1
# Bootstrapper: prepara l'ambiente, costruisce l'installer NSIS e lo lancia.
# Esegui con:  tasto destro > Esegui con PowerShell  (oppure da prompt: powershell -ExecutionPolicy Bypass -File .\BuildInstaller.ps1)

param(
  [switch]$AutoInstall # avvia direttamente l'installer generato al termine
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Section($t){ Write-Host "`n=== $t ===" -ForegroundColor Cyan }

function Test-Command($name){
  try { $null = Get-Command $name -ErrorAction Stop; return $true } catch { return $false }
}

function Ensure-Node {
  Write-Section "Verifica Node.js / npm"
  if (Test-Command node -and Test-Command npm) {
    $ver = (node -v).Trim().TrimStart('v')
    Write-Host "Trovato Node $ver" -ForegroundColor Green
    try {
      $major = [int]($ver.Split('.')[0])
      if ($major -ge 18) { return }
    } catch {}
    Write-Host "Versione Node troppo vecchia, aggiorno alla LTS..." -ForegroundColor Yellow
  } else {
    Write-Host "Node.js non trovato, installo LTS..." -ForegroundColor Yellow
  }

  if (Test-Command winget) {
    Write-Host "Uso winget per installare OpenJS.NodeJS.LTS..." -ForegroundColor Yellow
    winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements -h || `
      (Write-Host "Installazione via winget non riuscita." -ForegroundColor Red)
  } else {
    Write-Host "winget non disponibile. Scarico MSI LTS (x64)..." -ForegroundColor Yellow
    $tmp = Join-Path $env:TEMP "nodejs.msi"
    # URL di fallback: v20.18.0 x64 (puoi aggiornare se necessario)
    $url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi"
    Invoke-WebRequest -Uri $url -OutFile $tmp
    Write-Host "Eseguo msiexec /i per Node..." -ForegroundColor Yellow
    Start-Process "msiexec.exe" -ArgumentList "/i `"$tmp`" /qn /norestart" -Wait -NoNewWindow
  }

  if (!(Test-Command node)) { throw "Node non installato. Riavvia PowerShell o installa manualmente da https://nodejs.org/." }
  Write-Host "Node installato: $(node -v) — npm: $(npm -v)" -ForegroundColor Green
}

function NpmInstall {
  Write-Section "Installazione dipendenze npm"
  npm ci 2>$null || npm install
}

function BuildDist {
  Write-Section "Build dell'installer (electron-builder)"
  npm run dist
}

function Find-Installer {
  $candidates = @()
  $paths = @("dist","release",".")
  foreach ($p in $paths) {
    if (Test-Path $p) {
      $candidates += Get-ChildItem -Path $p -Recurse -Filter "GlobalCorp-Sim-*-Setup.exe" -ErrorAction SilentlyContinue
    }
  }
  if ($candidates.Count -eq 0) { return $null }
  # prendi il più recente
  $sel = $candidates | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  return $sel.FullName
}

function Main {
  $root = Split-Path -Parent $MyInvocation.MyCommand.Path
  Set-Location $root
  Write-Section "GlobalCorp Sim — Bootstrap installer"
  Ensure-Node
  NpmInstall
  BuildDist
  $exe = Find-Installer
  if (-not $exe) { throw "Installer non trovato. Controlla la cartella 'dist' o 'release'." }
  Write-Host "Installer generato: $exe" -ForegroundColor Green
  if ($AutoInstall) {
    Write-Section "Avvio installer"
    Start-Process $exe
  } else {
    Write-Host "`nPer avviare l'installazione, fai doppio clic su:`n$exe" -ForegroundColor Yellow
  }
}

try { Main } catch { Write-Host "ERRORE: $($_.Exception.Message)" -ForegroundColor Red; exit 1 }
