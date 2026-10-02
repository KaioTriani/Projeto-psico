import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
const root = fileURLToPath(new URL(existsSync(new URL('./dist/index.html', import.meta.url)) ? './dist/' : './', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
http.createServer(async(req,res)=>{try{const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file = resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403);res.end();return;}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Não encontrado');}}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
