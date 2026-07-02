# Scripts to copy and map assets from D: drive to C: project root
$ErrorActionPreference = "Stop"

$sourceDir = "D:\PT. Santoso Jaya Tembakau"
$projectRoot = "C:\Users\ADVAN\Documents\PT. SANTOSO JAYA TEMBAKAU"
$destDir = Join-Path $projectRoot "public"

# Create destinations folders
$folders = @(
    $destDir,
    (Join-Path $destDir "3D PRODUK ROKOK LANDING PAGE KANAN DAN KIRI"),
    (Join-Path $destDir "Design Produk"),
    (Join-Path $destDir "Produk TSC SJT"),
    (Join-Path $destDir "PRODUK TEMBAKAU TSG")
)

foreach ($f in $folders) {
    if (-not (Test-Path -LiteralPath $f)) {
        New-Item -ItemType Directory -Path $f -Force | Out-Null
        Write-Host "Created directory: $f"
    }
}

# 1. Copy Logo and root assets
$rootAssets = @{
    "Logo PT Santoso.png" = "Logo PT Santoso.png"
    "Kantor Depan.jpeg" = "Kantor Depan.jpeg"
    "CAP BAL BHM SKT 12 BATANG.jpg" = "CAP BAL BHM SKT 12 BATANG.jpg"
}

foreach ($item in $rootAssets.GetEnumerator()) {
    $srcFile = Join-Path $sourceDir $item.Key
    $destFile = Join-Path $destDir $item.Value
    if (Test-Path -LiteralPath $srcFile) {
        Copy-Item -Path $srcFile -Destination $destFile -Force
        Write-Host "Copied $srcFile -> $destFile"
    } else {
        Write-Warning "Source file not found: $srcFile"
    }
}

# 2. Copy and map 3D Rokok
$rokokSrcDir = Join-Path $sourceDir "3D Produk Rokok"
$rokokDestDir = Join-Path $destDir "3D PRODUK ROKOK LANDING PAGE KANAN DAN KIRI"

$rokokMapping = @{
    "BHM 12.png" = @("BAHAMAS 12 BATANG KIRI.png", "BAHAMAS 12 BATANG KANAN.png", "SANTOS BAHAMAS FILTER 12 BATANG KIRI.png", "SANTOS BAHAMAS FILTER 12 BATANG KANAN.png")
    "BHM 20.png" = @("BAHAMAS 20 BATANG KIRI.png", "BAHAMAS 20 BATANG KANAN.png")
    "KPB 16.png" = @("KUPU BIRU 16 BATANG KIRI.png", "KUPU BIRU 16 BATANG KANAN.png")
    "SBK 12.png" = @("SOSROBAHU KOPI HITAM 12 BATANG KIRI.png", "SOSROBAHU KOPI HITAM 12 BATANG KANAN.png", "SOSROBAHU SANTOS FILTER 12 BATANG KIRI.png", "SOSROBAHU SANTOS FILTER 12 BATANG KANAN.png")
    "SBO 12.PNG" = @("SOSROBAHU 12 BATANG KIRI.png", "SOSROBAHU 12 BATANG KANAN.png")
    "SBP 16.png" = @("SOSROBAHU PREMIUM 16 BATANG KIRI.png", "SOSROBAHU PREMIUM 16 BATANG KANAN.png")
    "TLD 12.png" = @("358 12 BATANG KIRI.png", "358 12 BATANG KANAN.png")
    "TLD 16 kanan.png" = @("358 16 BATANG KIRI.png", "358 16 BATANG KANAN.png")
}

foreach ($item in $rokokMapping.GetEnumerator()) {
    $srcFile = Join-Path $rokokSrcDir $item.Key
    if (Test-Path -LiteralPath $srcFile) {
        foreach ($targetName in $item.Value) {
            $destFile = Join-Path $rokokDestDir $targetName
            Copy-Item -Path $srcFile -Destination $destFile -Force
            Write-Host "Copied Rokok Asset: $srcFile -> $destFile"
        }
    } else {
        Write-Warning "Source Rokok file not found: $srcFile"
    }
}

# 3. Copy backgrounds to Design Produk
$bgSrcDir = Join-Path $sourceDir "BG Produk SKT WEB"
$bgDestDir = Join-Path $destDir "Design Produk"

if (Test-Path -LiteralPath $bgSrcDir) {
    $bgFiles = Get-ChildItem -Path $bgSrcDir -File
    foreach ($file in $bgFiles) {
        $destFile = Join-Path $bgDestDir $file.Name
        Copy-Item -Path $file.FullName -Destination $destFile -Force
        Write-Host "Copied Background: $($file.FullName) -> $destFile"
    }
} else {
    Write-Warning "Source BG directory not found: $bgSrcDir"
}

# 4. Copy and map Tembakau TSC
$tembakauSrcDir = Join-Path $sourceDir "BG Tembakau 3D Beranda Web"
$tscDestDir = Join-Path $destDir "Produk TSC SJT"

$tscMapping = @{
    "Tembakau TSC 01.png" = @("TSC BOLD.png", "TSC KRETEK.png", "TSC MILD.png", "TSC REGULER.png", "EXPANDED DOUBLE CUTTER.png", "EXPANDED SINGLE CUT.png")
    "Tembakau TSC 02.png" = @("FINES.png", "EXPANDED.png", "UPON REQUEST.png", "FINES KASTURI.png", "FINES PAITON.png", "FINES RAJANG MADURA.png")
    "Tembakau TSC 03.png" = @("MATA AYAM YUNAN.png", "MATA AYAM KASTURI.png", "MATA AYAM MADURA.png", "MATA AYAM LOMBOK.png", "PAITON TRASING.png", "PAKPIE.png", "REDRY RAJANGLOMBOK.png", "SCRAP KASTURI.png", "SCRAP RAJANG PAITON.png")
}

foreach ($item in $tscMapping.GetEnumerator()) {
    $srcFile = Join-Path $tembakauSrcDir $item.Key
    if (Test-Path -LiteralPath $srcFile) {
        foreach ($targetName in $item.Value) {
            $destFile = Join-Path $tscDestDir $targetName
            Copy-Item -Path $srcFile -Destination $destFile -Force
            Write-Host "Copied TSC Asset: $srcFile -> $destFile"
        }
    } else {
        Write-Warning "Source TSC file not found: $srcFile"
    }
}

# 5. Copy and map Tembakau TSG
$tsgDestDir = Join-Path $destDir "PRODUK TEMBAKAU TSG"

$tsgMapping = @{
    "Tembakau TSG 01.png" = @("TSG BOLD.png", "TSG KRETEK.png", "BOLD.png")
    "Tembakau TSG 02.png" = @("TSG MILD.png", "TSG PUTIHAN.png", "PUTIHAN.png", "MILD.png")
    "Tembakau TSG 03.png" = @("TSG REGULER.png", "TSG UPON REQUEST.png", "REGULER.png", "UPON REQUEST.png")
}

foreach ($item in $tsgMapping.GetEnumerator()) {
    $srcFile = Join-Path $tembakauSrcDir $item.Key
    if (Test-Path -LiteralPath $srcFile) {
        foreach ($targetName in $item.Value) {
            $destFile = Join-Path $tsgDestDir $targetName
            Copy-Item -Path $srcFile -Destination $destFile -Force
            Write-Host "Copied TSG Asset: $srcFile -> $destFile"
        }
    } else {
        Write-Warning "Source TSG file not found: $srcFile"
    }
}

# 6. Copy default fallback backgrounds for missing ones in Tentang Kami and Karir
$fallbacks = @{
    "BG Tentang Kami.png" = "Kantor Depan.jpeg"
    "BG Visi.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "BG Misi.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "Sejarah Awal.png" = "Kantor Depan.jpeg"
    "BG Generasi Kedua.png" = "Kantor Depan.jpeg"
    "BG Pengembangans.png" = "Kantor Depan.jpeg"
    "BG INTEGRITAS.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "BG KUALITAS.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "BG INOVASI.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "BG KOLABORASI.png" = "BG Produk SKT WEB\Latar Belakang WEB 358.jpg"
    "Tembakau Rajang.png" = "BG Tembakau 3D Beranda Web\Tembakau TSC 01.png"
    "Landing Page Section Siapa Kami.png" = "Kantor Depan.jpeg"
}

foreach ($item in $fallbacks.GetEnumerator()) {
    $srcFile = Join-Path $sourceDir $item.Value
    $destFile = Join-Path $destDir $item.Key
    if (Test-Path -LiteralPath $srcFile) {
        Copy-Item -Path $srcFile -Destination $destFile -Force
        Write-Host "Copied Fallback Asset: $srcFile -> $destFile"
    } else {
        Write-Warning "Source Fallback file not found: $srcFile"
    }
}

Write-Host "All assets successfully copied and mapped!"
