import http.server, os, sys
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frames'); os.makedirs(OUT, exist_ok=True)
class H(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        n = int(self.headers.get('Content-Length', 0)); body = self.rfile.read(n)
        if self.path.startswith('/frame/'):
            open(os.path.join(OUT, 'f%s.png' % self.path.split('/')[-1]), 'wb').write(body)
        self.send_response(200); self.end_headers(); self.wfile.write(b'ok')
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', 8766), H).serve_forever()
