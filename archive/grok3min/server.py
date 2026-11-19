import http.server, os
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'frames'); os.makedirs(OUT, exist_ok=True)
os.chdir(HERE)
class H(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        n = int(self.headers.get('Content-Length', 0)); body = self.rfile.read(n)
        if self.path.startswith('/frame/'):
            open(os.path.join(OUT, os.path.basename(self.path)), 'wb').write(body)
        self.send_response(200); self.end_headers(); self.wfile.write(b'ok')
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', 8767), H).serve_forever()
