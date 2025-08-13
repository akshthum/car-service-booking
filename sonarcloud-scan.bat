@echo off
echo Running SonarCloud analysis...
 
REM Download SonarScanner if not exists
if not exist "sonar-scanner" (
    echo Downloading SonarScanner...
    curl -L -o sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-windows.zip
    powershell -command "Expand-Archive -Path sonar-scanner.zip -DestinationPath ."
    ren sonar-scanner-4.8.0.2856-windows sonar-scanner
    del sonar-scanner.zip
)
 
REM SonarCloud analysis with actual project details
sonarclous
sonar-scanner\bin\sonar-scanner.bat -Dsonar.organization=lohitha050 -Dsonar.projectKey=lohitha050_city-issue-reporter -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=65fc48537f43a16c7b3e779c753187b6439fd4a2
 
echo Analysis complete! Check https://sonarcloud.io
pause