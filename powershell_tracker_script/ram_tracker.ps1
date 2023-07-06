$ramCapacity = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum | Select-Object -ExpandProperty Sum
$ramCapacityGB = [Math]::Round(($ramCapacity / 1GB), 2)
echo $ramCapacityGB
