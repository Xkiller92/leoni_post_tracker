#get input from user

foreach ($name in Get-Content $filePath) {
    Invoke-Command -ComputerName $name -FilePath "combination.ps1"
}