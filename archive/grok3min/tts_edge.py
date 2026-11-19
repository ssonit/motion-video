import asyncio, json, edge_tts, subprocess
sc = json.load(open('script.json', encoding='utf8'))['scenes']
VOICE = 'en-US-AndrewNeural'
async def one(line, base):
    comm = edge_tts.Communicate(line, VOICE, boundary='WordBoundary', rate='-8%')
    words, audio = [], bytearray()
    async for ch in comm.stream():
        if ch['type'] == 'audio': audio += ch['data']
        elif ch['type'] == 'WordBoundary':
            words.append({'w': ch['text'], 's': ch['offset'] / 1e7, 'e': (ch['offset'] + ch['duration']) / 1e7})
    open(base + '.mp3', 'wb').write(audio)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', base + '.mp3', '-ar', '22050', '-ac', '1', '-c:a', 'pcm_s16le', base + '.wav'], check=True)
    json.dump(words, open(base + '.words.json', 'w'))
    return len(words)
async def main():
    for s in sc:
        for i, line in enumerate(s['lines']):
            n = await one(line, f"vo/{s['id']}_{i}")
            print(s['id'], i, n, 'words')
asyncio.run(main())
