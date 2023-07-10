#get input from user
param(
    [Parameter(Mandatory=$true)]
    [string]$server_url,

    [Parameter(Mandatory=$true)]
    [string]$workstation_list_path

)

foreach ($name in Get-Content $workstation_list_path) {
    Invoke-Command -ComputerName $name -FilePath "combination.ps1 -server_url $server_url -machine_name $name"
}