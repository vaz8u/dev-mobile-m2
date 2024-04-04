#!/bin/bash

# Ouvrir le premier terminal et exécuter 'npm run ios'
osascript -e 'tell app "Terminal" to do script "cd /Users/vaz/Document/GitHub/dev-mobile-m2/ && npm run ios"'

# Ouvrir le second terminal, naviguer vers 'wake-up-api' et exécuter 'npm run start:dev'
osascript -e 'tell app "Terminal" to do script "cd /Users/vaz/Document/GitHub/dev-mobile-m2/wake-up-api && npm run start:dev"'
