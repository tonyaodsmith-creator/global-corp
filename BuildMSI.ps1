
# BuildMSI.ps1
# Crea automaticamente un pacchetto MSI su Windows e lo avvia.
# Esegui con:  tasto destro > Esegui con PowerShell
param([switch]$AutoInstall)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Section($t){ Write-Host "`n=== $t ===" -ForegroundColor Cyan }
function Test-Command($n){ try { $null = Get-Command $n -ErrorAction Stop; $true } catch { $false } }

function Ensure-Node {
  Write-Section "Verifica Node.js / npm"
  if (!(Test-Command node) -or !(Test-Command npm)) {
    if (Test-Command winget) {
      Write-Host "Installo Node LTS con winget..." -ForegroundColor Yellow
      winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements -h
    } else {
      $url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi"
      $msi = Join-Path $env:TEMP "node_lts.msi"
      Invoke-WebRequest -Uri $url -OutFile $msi
      Start-Process msiexec.exe -ArgumentList "/i `"$msi`" /qn /norestart" -Wait
    }
  }
  Write-Host "Node: $(node -v) — npm: $(npm -v)" -ForegroundColor Green
}

function Ensure-WiX {
  Write-Section "Verifica WiX Toolset (necessario per .msi)"
  # Preferiamo la 3.14.0 per evitare il bug TEMP segnalato sui runner.
  $wixDir = "${env:ProgramFiles(x86)}\WiX Toolset v3.14\bin"
  if (Test-Path $wixDir) { Write-Host "WiX presente: $wixDir" -ForegroundColor Green; return }
  if (Test-Command choco) {
    Write-Host "Installo WiX 3.14.0 via Chocolatey..." -ForegroundColor Yellow
    choco install wixtoolset --version=3.14.0 -y --allow-downgrade --force
  } else {
    Write-Host "Scarico installer WiX 3.14.0..." -ForegroundColor Yellow
    $url = "https://github.com/wixtoolset/wix3/releases/download/wix3140rtm/wix314-binaries.zip"
    $zip = Join-Path $env:TEMP "wix314.zip"
    Invoke-WebRequest -Uri $url -OutFile $zip
    $dest = "C:\Wix314"
    if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($zip, $dest, $true)
    $env:PATH = "$dest\bin;$env:PATH"
  }
}

function NpmInstall {
  Write-Section "Installazione dipendenze npm"
  npm ci 2>$null || npm install
}

function BuildMSI {
  Write-Section "Build MSI (electron-builder)"
  $env:CSC_IDENTITY_AUTO = "false"  # nessuna firma codice
  npx electron-builder --win msi
}

function Find-MSI {
  $candidates = Get-ChildItem -Recurse -Filter "GlobalCorp-Sim-*-Setup.msi" -ErrorAction SilentlyContinue
  if ($candidates.Count -eq 0) { return $null }
  $sel = $candidates | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  return $sel.FullName
}

function Main {
  $root = Split-Path -Parent $MyInvocation.MyCommand.Path
  Set-Location $root
  Write-Section "GlobalCorp Sim — Costruzione MSI"
  Ensure-Node
  Ensure-WiX
  NpmInstall
  BuildMSI
  $msi = Find-MSI
  if (-not $msi) { throw "MSI non trovato (controlla cartelle dist/release)." }
  Write-Host "MSI generato: $msi" -ForegroundColor Green
  if ($AutoInstall) {
    Write-Section "Avvio installazione MSI"
    Start-Process msiexec.exe -ArgumentList "/i `"$msi`""
  } else {
    Write-Host "`nFai doppio clic su:`n$msi" -ForegroundColor Yellow
  }
}

try { Main } catch { Write-Host "ERRORE: $($_.Exception.Message)" -ForegroundColor Red; exit 1 }
