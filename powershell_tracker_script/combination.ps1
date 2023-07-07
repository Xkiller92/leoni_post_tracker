param(
    [Parameter(Mandatory=$true)]
    [string]$server_url
)

echo "hellp $server_url"

$capacity = foreach ($disk in Get-WmiObject -Class Win32_DiskDrive)
{
    [Math]::Round(($disk.Size / 1GB), 2)
    break
}

$total_space = "$(($capacity | Measure-Object -Sum).Sum)GB"

$FreeSpace = [Math]::Round(((Get-CimInstance Win32_Volume -Filter "DriveLetter = 'C:'").FreeSpace / 1GB),2)

$ramCapacity = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum | Select-Object -ExpandProperty Sum
$ramCapacityGB = [Math]::Round(($ramCapacity / 1GB), 2)

$url = "hiding_this_for_obvious_reasons" # Request URL

$nummer = Read-Host("Skriv inn mobil nummer: ")
$tekst = Read-Host("Skriv inn melding: ")

#Request Payload information
$JSON = @'
{
            "content": "$tekst",
            "senderNumber": "SSB",
            "targetNumbersAsDelimitedString": "47$nummer",
            "sendDate": null,
            "status": {"id": "5"},
            "numberOfTargetNumbers": null,
            "numberOfInvalidNumbers": ""
}
'@

Invoke-WebRequest -Uri $url -Method Post -Body $JSON -ContentType "application/json"
