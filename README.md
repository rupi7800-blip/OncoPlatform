# OncoPlatform

Sito statico mobile-first per la revisione sistematica dell'evidenza in oncologia molecolare.
Ogni meccanismo segue 6 passi in ordine: stato normale e alterazione, catena causale, ridondanze, storia dei tentativi, finestra terapeutica, buchi residui (più specifica dei parametri del modello).

Dati in `data/mechanisms.json`. Ogni affermazione ha una fonte (PubMed o registro trial) con `verificata: true` solo se controllata in sessione; altrimenti compare "fonte non reperita". Nessuna simulazione, nessuna indicazione terapeutica per singoli pazienti.

Anteprima locale: `python3 -m http.server` nella radice.

## Sito online

Indirizzo pubblico (GitHub Pages, dopo l'attivazione in Settings → Pages, ramo `main`, cartella `/ (root)`):
https://rupi7800-blip.github.io/OncoPlatform/
