# Build the React application
Write-Host "Building React app..." -ForegroundColor Green
npm run build

# Create a distribution folder
Write-Host "Creating distribution folder..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "dist"

# Copy build files to the dist folder
Write-Host "Copying build files to dist folder..." -ForegroundColor Green
Copy-Item -Path "build/*" -Destination "dist/" -Recurse -Force

Write-Host "Build completed successfully." -ForegroundColor Green
Write-Host "The React app is now available in the 'dist' folder." -ForegroundColor Green 