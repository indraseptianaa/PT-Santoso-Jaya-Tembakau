$ErrorActionPreference = "Stop"

$projectRoot = "C:\Users\ADVAN\Documents\PT. SANTOSO JAYA TEMBAKAU"
$npmPath = "C:\Program Files\nodejs\npm.cmd"
$scriptLogPath = Join-Path $projectRoot ".startup-script.log"
$logPath = Join-Path $projectRoot ".startup-dev.log"
$errorLogPath = Join-Path $projectRoot ".startup-dev.err.log"
$port = 5173

function Write-StartupLog([string]$Message) {
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  "[$timestamp] $Message" | Add-Content -LiteralPath $scriptLogPath -Encoding UTF8
}

function Test-LocalPort([int]$Port) {
  return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

try {
  if (Test-LocalPort -Port $port) {
    Write-StartupLog "Port $port is already active. Dev server startup skipped."
    exit 0
  }

  if (-not (Test-Path -LiteralPath $npmPath)) {
    throw "npm.cmd was not found at $npmPath"
  }

  Write-StartupLog "Starting the Vite dev server on port $port..."
  
  Start-Process `
    -FilePath $npmPath `
    -ArgumentList "run", "dev" `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput $logPath `
    -RedirectStandardError $errorLogPath | Out-Null

  # Wait a few seconds to verify if it started successfully
  Start-Sleep -Seconds 3
  if (Test-LocalPort -Port $port) {
    Write-StartupLog "Dev server successfully started on port $port."
  } else {
    Write-StartupLog "Warning: Dev server port $port is not listening yet. Check $errorLogPath for errors."
  }
}
catch {
  Write-StartupLog "Startup failed: $($_.Exception.Message)"
  exit 1
}
