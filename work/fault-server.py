from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
root=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw): super().__init__(*a,directory=str(root/'dist'),**kw)
 def end_headers(self): self.send_header('Cache-Control','no-store');super().end_headers()
 def do_GET(self):
  if (root/'work/faults-on').exists() and (('look-01-' in self.path and ('1920' in self.path or '960' in self.path)) or 'look-02-' in self.path):
   self.send_error(503,'Simulated image failure');return
  super().do_GET()
ThreadingHTTPServer(('127.0.0.1',5175),Handler).serve_forever()
