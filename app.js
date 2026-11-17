'use strict';
const SECTIONS = [
  ['normale','1. Stato normale e alterazione'],
  ['catena','2. Catena causale'],
  ['ridondanze','3. Ridondanza e vie parallele'],
  ['tentativi','4. Storia dei tentativi'],
  ['finestra','5. Finestra terapeutica'],
  ['buchi','6. Buchi residui'],
  ['parametri','Parametri del modello']
];
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function src(f){
  if(!f || !f.id) return '<span class="b ko">fonte non reperita · non verificata</span>';
  const ok = f.verificata === true;
  return `<span class="b ${ok?'ok':'ko'}">${esc(f.tipo)} ${esc(f.id)} · ${ok?'verificata':'non verificata'}</span>`;
}
const LIV = {in_vitro:'in vitro', animale:'modello animale', clinico:'clinico', ipotesi:'ipotesi dell\'autore'};
function claim(c){
  return `<div class="card"><div>${esc(c.testo)}</div>
  <div class="meta">${c.livello?esc(LIV[c.livello]||c.livello)+' · ':''}${c.prova?'prova: '+esc(c.prova)+' · ':''}${src(c.fonte)}${c.inferenza?' · <b>inferenza, non misura diretta</b>':''}</div></div>`;
}
function list(arr, empty){
  return arr && arr.length ? arr.map(claim).join('') : `<p class="meta">${empty}</p>`;
}
function tentativi(arr){
  if(!arr.length) return '<p class="meta">Nessun tentativo registrato. Cercare anche trial sospesi, terminati o mai pubblicati; se la ragione non è pubblica, scriverlo.</p>';
  const rows = arr.map(t=>`<tr><td>${esc(t.composto)}</td><td>${esc(t.bersaglio)}</td><td>${esc(t.fase)}</td><td>${esc(t.esito)}</td><td>${esc(t.ragione||'non reperita')}</td><td>${src(t.fonte)}</td></tr>`).join('');
  return `<div class="tw"><table><thead><tr><th>Composto</th><th>Bersaglio</th><th>Fase</th><th>Esito</th><th>Ragione interruzione</th><th>Fonte</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function buchi(arr){
  if(!arr.length) return '<p class="meta">Compilare solo dopo i punti 1-5.</p>';
  return arr.map(b=>`<div class="card"><b>${esc(b.domanda)}</b><div class="meta">Disegno in vitro: ${esc(b.disegno)}<br>Falsificata se: ${esc(b.falsificazione)}</div></div>`).join('');
}
function parametri(arr){
  if(!arr.length) return '<p class="meta">Nessuna simulazione prodotta. Qui si elencano i parametri necessari: misurato (con fonte), stimato per analogia, oppure assente.</p>';
  const rows = arr.map(p=>`<tr><td>${esc(p.nome)}</td><td>${esc(p.stato)}</td><td>${esc(p.valore??'')}</td><td>${src(p.fonte)}</td></tr>`).join('');
  return `<div class="tw"><table><thead><tr><th>Parametro</th><th>Stato</th><th>Valore</th><th>Fonte</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function render(m){
  if(!m){ $('#main').innerHTML='<div class="note">Nessun meccanismo disponibile.</div>'; return; }
  const r = m.ridondanze || {studiate:false, voci:[]};
  const html = {
    normale: list(m.normale,'Funzione fisiologica, alterazione nel tumore, tipi tumorali con e senza alterazione documentata.'),
    catena: list(m.catena,'Passaggi dal segnale a monte al fenotipo, con tipo di prova (biochimica, genetica, correlativa).'),
    ridondanze: (r.studiate?'':'<div class="note">Nessuno studio di ridondanza reperito: è un buco nella conoscenza, non un\'assenza di ridondanza.</div>') + list(r.voci,'Nessuna via parallela registrata.'),
    tentativi: tentativi(m.tentativi||[]),
    finestra: list(m.finestra,'Tessuti sani in cui il nodo è attivo, dipendenza funzionale, tossicità osservate o prevedibili.'),
    buchi: buchi(m.buchi||[]),
    parametri: parametri(m.parametri||[])
  };
  $('#nav').innerHTML = SECTIONS.map(([k,t])=>`<a href="#${k}">${esc(t.split('. ').pop())}</a>`).join('');
  $('#main').innerHTML = (m.note?`<div class="note">${esc(m.note)}</div>`:'') +
    SECTIONS.map(([k,t])=>`<section id="${k}"><h2>${esc(t)}</h2>${html[k]}</section>`).join('');
}
fetch('data/mechanisms.json').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); }).then(d=>{
  const sel = $('#sel');
  sel.innerHTML = d.mechanisms.map(m=>`<option value="${esc(m.id)}">${esc(m.name)}</option>`).join('');
  const go = () => render(d.mechanisms.find(m=>m.id===sel.value));
  sel.addEventListener('change', go); go();
}, ()=>{ $('#main').innerHTML='<div class="note">Impossibile caricare data/mechanisms.json (servire il sito via HTTP).</div>'; });
