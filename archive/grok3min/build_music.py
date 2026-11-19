import wave, math, json, struct, array
SR = 22050
total = json.load(open('timeline.json'))['total']
N = int(SR * total)
buf = array.array('f', [0.0]) * N
BPM = 88; spb = 60 / BPM; bar = 4 * spb
mid = lambda m: 440 * 2 ** ((m - 69) / 12)
CH = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]   # Am F C G (bass, triad)
def add(freq, t0, dur, amp, att, rel, parts=((1, 1.0), (2, .25), (3, .08))):
    a = int(t0 * SR); n = int(dur * SR)
    if a >= N: return
    n = min(n, N - a)
    for k, ka in parts:
        w = 2 * math.pi * freq * k / SR
        for i in range(n):
            t = i / SR
            env = min(1, t / att) * (1 if t < dur - rel else max(0, (dur - t) / rel))
            buf[a + i] += math.sin(w * i) * amp * ka * env
def pluck(freq, t0, dur, amp):
    a = int(t0 * SR); n = min(int(dur * SR), N - a)
    if n <= 0: return
    for k, ka in ((1, 1.0), (2, .35), (3, .15)):
        w = 2 * math.pi * freq * k / SR
        for i in range(n):
            t = i / SR
            buf[a + i] += math.sin(w * i) * amp * ka * math.exp(-t * (5 + 2 * k)) * min(1, t / .004)
b = 0
while b * bar < total:
    t0 = b * bar; bass, tri = CH[(b // 2) % 4]
    prog = min(1, t0 / 40)                                   # music gently builds over the first 40 s
    if b % 2 == 0:
        for m in tri: add(mid(m), t0, bar * 2 + .3, .05, .9, 1.2)             # pad
    add(mid(bass - 24), t0, bar, .09, .02, .4, ((1, 1.0), (2, .2)))            # bass
    if t0 > 12:                                                                  # arpeggio enters after 12 s
        for i in range(8):
            m = tri[[0, 1, 2, 1, 0, 1, 2, 1][i]] + 12
            pluck(mid(m), t0 + i * spb / 2, spb * 1.4, .05 * prog + .02)
    b += 1
fade_in, fade_out = 3.0, 6.0
out = array.array('h')
for i in range(N):
    t = i / SR
    g = min(1, t / fade_in) * min(1, (total - t) / fade_out)
    v = max(-1, min(1, buf[i] * g * 1.4))
    out.append(int(v * 32767))
w = wave.open('music.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes()); w.close()
print('music', total)
