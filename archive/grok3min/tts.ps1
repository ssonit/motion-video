Add-Type -AssemblyName System.Speech
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$script = Get-Content (Join-Path $dir 'script.json') -Raw | ConvertFrom-Json
$out = Join-Path $dir 'vo'
New-Item -ItemType Directory -Force $out | Out-Null
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SelectVoice('Microsoft Zira Desktop')
$s.Rate = -3
$n = 0
foreach ($sc in $script.scenes) {
  $i = 0
  foreach ($line in $sc.lines) {
    $f = Join-Path $out ("{0}_{1}.wav" -f $sc.id, $i)
    $s.SetOutputToWaveFile($f)
    $s.Speak($line)
    $s.SetOutputToNull()
    $i++; $n++
  }
}
$s.Dispose()
"generated $n files"
