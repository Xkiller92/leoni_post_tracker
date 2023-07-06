$capacity = foreach ($disk in Get-WmiObject -Class Win32_DiskDrive)
{
    [Math]::Round(($disk.Size / 1GB), 2)
    break
}

$total_space = "$(($capacity | Measure-Object -Sum).Sum)GB"

$FreeSpace = [Math]::Round(((Get-CimInstance Win32_Volume -Filter "DriveLetter = 'C:'").FreeSpace / 1GB),2)

echo $FreeSpace

$ramCapacity = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum | Select-Object -ExpandProperty Sum
$ramCapacityGB = [Math]::Round(($ramCapacity / 1GB), 2)
echo $ramCapacityGB  