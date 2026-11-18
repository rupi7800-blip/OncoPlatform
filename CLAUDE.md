# Regole di consumo e ruoli

- Sonnet gestisce la sessione principale: scrive codice e corregge bug.
- Ricerche nel repository, grep e test vanno ai sotto-agenti Haiku 5.5 (`search`, `grep`, `audit`),
  anche in parallelo, per mantenere il contesto principale snello.
- `audit` lavora in worktree isolato, così non tocca il branch di lavoro.
- Opus (`advisor`) è in stand-by: lo si invoca solo per decisioni chiave e per la firma finale dei diff.
  Non sprecare il suo contesto su lavoro di routine.
- Scelte rapide e deterministiche (scelta tool, percorso, retry) le decide direttamente Sonnet, senza sotto-agenti.

## Procedura di revisione per ogni nuovo meccanismo

Per ogni meccanismo oncologico nuovo si segue sempre questo ordine:

1. Passi 1-5 della scheda (stato normale e alterazione, catena causale, ridondanze, storia dei tentativi, finestra terapeutica), con sotto-agenti Haiku in parallelo; l'affermazione di partenza dell'utente non è un dato da assumere ma da verificare.
2. Passo 6 (buchi residui): per ciascuna domanda residua si verifica sempre, con sotto-agenti Haiku in parallelo (uno per domanda o per coppia di domande), se l'esperimento è già stato fatto in tutto o in parte (verdetto GIÀ FATTO, PARZIALMENTE FATTO o NON TROVATO), che cosa manca davvero, e si riformulano disegno e criterio di falsificazione. Una domanda mal posta va corretta e dichiarato il motivo. Il campo `verifica` della domanda riporta ciò che esiste già.
3. Tre giri di verifica delle fonti: giro 1 riletture dirette su PubMed e registro dei trial; giro 2 confronto di ogni PMID con titolo e abstract; giro 3 controllo indipendente delle affermazioni negative e dei record del registro non ancora riletti.
4. Una fonte è marcata `verificata` solo se riletta; il resto resta 'non verificata'. Nessun identificativo inventato; 'fonte non reperita' dove manca.
5. Commit, push e pubblicazione della pagina; la PR verso main aggiorna il sito (GitHub Pages).
