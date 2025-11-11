# Deploy to GitHub Pages Script
# Usage: .\deploy.ps1

# Colors for output
function Write-Success {
    Write-Host $args[0] -ForegroundColor Green
}

function Write-Error-Msg {
    Write-Host $args[0] -ForegroundColor Red
}

# Step 1: Build
Write-Host "=== Building project ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error-Msg "Build failed!"
    exit 1
}
Write-Success "Build successful!"

# Step 2: Create gh-pages branch if it doesn't exist
Write-Host "`n=== Checking gh-pages branch ===" -ForegroundColor Cyan
$branchExists = git rev-parse --verify gh-pages 2>$null
if (-not $branchExists) {
    Write-Host "Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages branch"
    git push -u origin gh-pages
    git checkout main
    Write-Success "gh-pages branch created!"
} else {
    Write-Success "gh-pages branch already exists"
}

# Step 3: Deploy dist folder to gh-pages
Write-Host "`n=== Deploying to gh-pages ===" -ForegroundColor Cyan
git add -f dist
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Use git subtree to push dist to gh-pages
Write-Host "Pushing dist to gh-pages branch..."
git subtree push --prefix dist origin gh-pages --force

if ($LASTEXITCODE -eq 0) {
    Write-Success "Deployment successful!"
    Write-Host "`nYour site is live at: https://sangbejoo.github.io/myPortfolio/" -ForegroundColor Green
} else {
    Write-Error-Msg "Deployment failed!"
    exit 1
}
