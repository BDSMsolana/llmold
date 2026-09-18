$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$outputDirectory = Join-Path $projectRoot '.cf-deploy'
New-Item -ItemType Directory -Path (Join-Path $outputDirectory 'assets') -Force | Out-Null
$publicFiles = @('index.html', 'styles.css', 'final.css', 'card-layout.css', 'growth.css', 'lab.css', 'cards.js', 'lab.js', 'app.js', 'growth.js', 'robots.txt', '_redirects')
foreach ($file in $publicFiles) {
  Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination (Join-Path $outputDirectory $file) -Force
}
$assets = @('favicon.svg', 'llmold-avatar.png', 'llmold-scene-banner.png', 'llmold-banner.png', 'llmold-social-card-v2.png', 'llmold-x-card-v3.jpg', 'canon-lab.png')
foreach ($asset in $assets) {
  Copy-Item -LiteralPath (Join-Path $projectRoot ('assets/' + $asset)) -Destination (Join-Path $outputDirectory ('assets/' + $asset)) -Force
}
Write-Output 'Public website staged in .cf-deploy. Private files are not copied.'
