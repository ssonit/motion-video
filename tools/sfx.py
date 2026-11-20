"""Synthesize sound effects and an upbeat music bed for the Guide video.
Everything is generated from scratch (no licensing concerns).
Run once:  python tools/sfx.py
Output: studio/public/shared/sfx/*.wav (44.1 kHz, 16-bit, mono).
Used via <Sfx name="tick1|tick2|tick3|pop1|pop2|whoosh|ding|typing"/> and the looping `bed` music."""
import pathlib
import wave

import numpy as np

SR = 44100
OUT = pathlib.Path(__file__).resolve().parent.parent / "studio" / "public" / "shared" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(11)


def save(name: str, x: np.ndarray) -> None:
    x = np.clip(x, -1, 1)
    with wave.open(str(OUT / f"{name}.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def t_(sec: float) -> np.ndarray:
    return np.arange(int(SR * sec)) / SR


def fft_filter(x: np.ndarray, lo: float | None = None, hi: float | None = None) -> np.ndarray:
    """Brick-wall band filter: keep lo..hi Hz (None = open)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(x.size, 1 / SR)
    m = np.ones_like(f)
    if lo is not None:
        m *= f >= lo
    if hi is not None:
        m *= f <= hi
    return np.fft.irfft(X * m, x.size)


def place(dst: np.ndarray, src: np.ndarray, at: float, gain: float = 1.0) -> None:
    i = int(at * SR)
    if i >= dst.size:
        return
    n = min(src.size, dst.size - i)
    dst[i : i + n] += src[:n] * gain


# ---------------------------------------------------------------- effects
def click(freq: float, bright: float = 1.0) -> np.ndarray:
    """Crisp UI click: noise transient + short pitched thock."""
    t = t_(0.09)
    noise = fft_filter(rng.standard_normal(t.size), lo=2500) * np.exp(-t * 520) * 0.35 * bright
    thock = np.sin(2 * np.pi * freq * t * (1 - 0.25 * t / t[-1])) * np.exp(-t * 85)
    return (noise + thock * 0.7) * 0.7


def bubble(f0: float, f1: float) -> np.ndarray:
    t = t_(0.16)
    f = f0 * (f1 / f0) ** (t / t[-1])
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 22) * 0.6


def whoosh() -> np.ndarray:
    t = t_(0.75)
    n = rng.standard_normal(t.size)
    out = np.zeros_like(n)
    # three overlapping band-passed layers whose centre rises over time
    for lo, hi, amp in [(300, 1600, 0.55), (1200, 5000, 0.4), (3000, 9000, 0.25)]:
        out += fft_filter(n, lo, hi) * amp
    env = np.sin(np.pi * (t / t[-1])) ** 1.6
    swell = 0.6 + 0.8 * (t / t[-1])
    thump = np.sin(2 * np.pi * 70 * t) * np.exp(-t * 14) * 0.5
    return (out * env * swell * 0.9 + thump) * 0.55


def sparkle() -> np.ndarray:
    """Three-note rising chime: E6 - G#6 - B6, with a shimmering tail."""
    out = np.zeros(int(SR * 1.2))
    for k, f in enumerate([1318.5, 1661.2, 1975.5]):
        t = t_(1.0)
        note = (
            np.sin(2 * np.pi * f * t) * 0.5
            + np.sin(2 * np.pi * f * 2 * t) * 0.18
            + np.sin(2 * np.pi * f * 3.01 * t) * 0.06
        ) * np.exp(-t * (5.5 - k))
        place(out, note, k * 0.065, 0.45)
    return out


def keyclick() -> np.ndarray:
    """One mechanical key: down-stroke + up-stroke."""
    t = t_(0.06)
    down = fft_filter(rng.standard_normal(t.size), 1200, 7000) * np.exp(-t * 260)
    body = np.sin(2 * np.pi * rng.uniform(380, 520) * t) * np.exp(-t * 120) * 0.6
    out = np.zeros(int(SR * 0.12))
    place(out, down * 0.6 + body, 0, 1.0)
    place(out, down * 0.25, 0.07, 1.0)
    return out


def typing() -> np.ndarray:
    n = int(SR * 2.0)
    y = np.zeros(n)
    pos = 0.0
    while pos < 1.85:
        place(y, keyclick(), pos, rng.uniform(0.5, 0.85))
        pos += rng.uniform(0.06, 0.15)
    return y


# ---------------------------------------------------------------- music bed
def midi(n: int) -> float:
    return 440.0 * 2 ** ((n - 69) / 12)


def pluck(f: float, dur: float, bright: float = 1.0) -> np.ndarray:
    t = t_(dur)
    s = (
        np.sin(2 * np.pi * f * t)
        + 0.45 * bright * np.sin(2 * np.pi * 2 * f * t)
        + 0.2 * bright * np.sin(2 * np.pi * 3 * f * t)
    )
    return s * np.exp(-t * 9) * (1 - np.exp(-t * 400))


def kick() -> np.ndarray:
    t = t_(0.32)
    f = 48 + 90 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 11)


def hat(open_: bool = False) -> np.ndarray:
    t = t_(0.18 if open_ else 0.05)
    return fft_filter(rng.standard_normal(t.size), lo=6500) * np.exp(-t * (28 if open_ else 110))


def clap() -> np.ndarray:
    t = t_(0.16)
    n = fft_filter(rng.standard_normal(t.size), 900, 6000)
    env = np.exp(-t * 45) + 0.7 * np.exp(-np.maximum(t - 0.012, 0) * 60) * (t > 0.012)
    return n * env


def bed() -> np.ndarray:
    bpm = 112
    beat = 60 / bpm
    bars = 16
    total = bars * 4 * beat
    out = np.zeros(int(SR * total) + SR)
    # A minor feel: Am - F - C - G, two bars each
    prog = [
        (45, [57, 60, 64]),  # Am
        (41, [53, 57, 60]),  # F
        (48, [55, 60, 64]),  # C
        (43, [55, 59, 62]),  # G
    ]
    for bar in range(bars):
        root, tones = prog[(bar // 2) % 4]
        b0 = bar * 4 * beat
        # kick on 1 and 3 (and a ghost on the 'and' of 3 every other bar)
        for k in (0, 2):
            place(out, kick(), b0 + k * beat, 0.9)
        if bar % 2:
            place(out, kick(), b0 + 3.5 * beat, 0.45)
        # clap on 2 and 4
        for k in (1, 3):
            place(out, clap(), b0 + k * beat, 0.22)
        # off-beat hats, open hat at the end of the bar
        for e in range(8):
            place(out, hat(open_=(e == 7)), b0 + e * beat / 2 + (beat / 4 if e % 2 else 0), 0.12 if e % 2 else 0.07)
        # bass: root on 1, octave on 'and' of 2, root on 4
        for pos, note in [(0, root), (1.5, root + 12), (2.5, root), (3, root + 7)]:
            place(out, pluck(midi(note), 0.5, 0.4), b0 + pos * beat, 0.5)
        # bouncy arpeggio in 8ths
        order = [0, 1, 2, 1, 0, 1, 2, 1]
        for e in range(8):
            place(out, pluck(midi(tones[order[e]] + 12), 0.28, 1.0), b0 + e * beat / 2, 0.13)
        # soft pad
        t = t_(4 * beat)
        env = np.minimum(1, t / 0.5) * np.minimum(1, (t[-1] - t) / 0.5)
        pad = sum(np.sin(2 * np.pi * midi(n) * t) for n in tones) * 0.035 * env
        place(out, pad, b0, 1.0)
    out = out[: int(SR * total)]
    f = int(SR * 0.05)
    out[:f] *= np.linspace(0, 1, f)
    out[-f:] *= np.linspace(1, 0, f)
    return out / np.max(np.abs(out)) * 0.85


def bed_calm() -> np.ndarray:
    """Quiet ambient bed (no kick/snare): slow pad + soft bell arpeggio + low sub, 72 bpm. Sits under a voice-over."""
    bpm = 72
    beat = 60 / bpm
    bars = 16
    total = bars * 4 * beat
    out = np.zeros(int(SR * total) + SR)
    prog = [(45, [57, 60, 64]), (41, [53, 57, 60]), (48, [55, 60, 64]), (43, [55, 59, 62])]
    for bar in range(bars):
        root, tones = prog[(bar // 2) % 4]
        b0 = bar * 4 * beat
        t = t_(4 * beat + 0.6)
        env = np.minimum(1, t / 1.2) * np.minimum(1, (t[-1] - t) / 1.2)
        pad = sum(np.sin(2 * np.pi * midi(n) * t) + 0.3 * np.sin(2 * np.pi * midi(n) * 2.003 * t) for n in tones) * 0.05 * env
        place(out, pad, b0, 1.0)
        place(out, np.sin(2 * np.pi * midi(root) * t) * 0.16 * env, b0, 1.0)
        for e in range(8):  # soft bell, every half beat on 8 slots
            n = tones[[0, 2, 1, 2, 0, 1, 2, 1][e]] + 12
            place(out, pluck(midi(n), 0.9, 0.6) * 0.55, b0 + e * beat / 2 * 1.0, 0.11)
    out = out[: int(SR * total)]
    f = int(SR * 0.05)
    out[:f] *= np.linspace(0, 1, f)
    out[-f:] *= np.linspace(1, 0, f)
    return out / np.max(np.abs(out)) * 0.85


save("tick1", click(1500))
save("tick2", click(1900, 1.15))
save("tick3", click(1250, 0.9))
save("pop1", bubble(260, 820))
save("pop2", bubble(340, 1100))
save("whoosh", whoosh())
save("ding", sparkle())
save("typing", typing())
save("bed", bed())
save("bed_calm", bed_calm())
print(sorted(p.name for p in OUT.iterdir()))
