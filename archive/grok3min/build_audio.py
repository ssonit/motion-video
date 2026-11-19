import wave, json, os
sc = json.load(open('script.json', encoding='utf8'))['scenes']
GAP, TAIL, LEAD, END = 0.8, 2.0, 0.8, 5.0
parts = []; params = None
t = LEAD; timeline = []
pcm = bytearray()
def silence(sec, p):
    return b'\x00' * (int(p.framerate * sec) * p.sampwidth * p.nchannels)
for s in sc:
    entry = {'id': s['id'], 'start': t, 'lines': []}
    for i, text in enumerate(s['lines']):
        w = wave.open(f"vo/{s['id']}_{i}.wav"); p = w.getparams(); fr = w.readframes(w.getnframes()); w.close()
        if params is None:
            params = p; pcm += silence(LEAD, p)
        dur = p.nframes / p.framerate
        words = [{'w': x['w'], 's': round(t + x['s'], 3), 'e': round(t + x['e'], 3)} for x in json.load(open(f"vo/{s['id']}_{i}.words.json"))]
        entry['lines'].append({'text': text, 'start': round(t, 3), 'end': round(t + dur, 3), 'words': words})
        pcm += fr; t += dur
        if i < len(s['lines']) - 1:
            pcm += silence(GAP, p); t += GAP
    pcm += silence(TAIL, params); t += TAIL
    entry['end'] = round(t, 3); entry['start'] = round(entry['start'], 3)
    timeline.append(entry)
# the very first scene starts at 0 (lead-in is part of it)
timeline[0]['start'] = 0.0
pcm += silence(END - TAIL, params); t += END - TAIL
total = round(t, 3)
timeline[-1]['end'] = total
out = wave.open('narration.wav', 'wb'); out.setparams(params); out.writeframes(bytes(pcm)); out.close()
json.dump({'total': total, 'scenes': timeline}, open('timeline.json', 'w'), indent=1)
print(params, 'total', total)
for e in timeline: print(e['id'], round(e['start'], 1), round(e['end'], 1))
