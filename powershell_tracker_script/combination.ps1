0param(
    [Parameter(Mandatory=$true)]
    [string]$server_url
)

$capacity = foreach ($disk in Get-WmiObject -Class Win32_DiskDrive)
{
    [Math]::Round(($disk.Size / 1GB), 2)
    break
}

$total_space = "$(($capacity | Measure-Object -Sum).Sum)GB"

$free_space = [Math]::Round(((Get-CimInstance Win32_Volume -Filter "DriveLetter = 'C:'").FreeSpace / 1GB),2)

$ramCapacity = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum | Select-Object -ExpandProperty Sum
$ram_capacity_gb = [Math]::Round(($ramCapacity / 1GB), 2)


#Request Payload information
$JSON = @'
{
            "totalDiskSpace" : "$total_space",
            "freeDiskSpace" : "$free_space",
            "ramCapacity" : "$ram_capacity_gb",
            "isOnline" : "true"
}
'@

Invoke-WebRequest -Uri $server_url -Method Post -Body $JSON -ContentType "application/json"
