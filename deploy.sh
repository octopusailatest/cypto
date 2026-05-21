#!/bin/bash

echo "🚀 Deploying Octopus Site to GitHub..."

# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Octopus site with modern design"

# Add remote repository
git remote add origin https://github.com/cryptoking1980queen-lab/octopusanomaly-site.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main

echo "✅ Site deployed successfully!"
echo "🌐 Your site will be available at: https://cryptoking1980queen-lab.github.io/octopusanomaly-site"
