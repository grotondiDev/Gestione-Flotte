# MonitFlotta

Applicativo di **monitoraggio e gestione flotte veicolari** realizzato per la tesi di laurea di **Giorgio Michele Rotondi** (Matricola **1232478**).

Il sistema consente di registrare i mezzi della flotta, tracciare in tempo reale la loro posizione GPS e visualizzare percorsi su mappa interattiva.

---

## Panoramica

MonitFlotta è un’applicazione full-stack composta da:

| Componente | Tecnologia | Porta |
|---|---|---|
| **Frontend** | Angular 13 + Leaflet + Bootstrap 5 | `4200` |
| **Backend** | Node.js + Express | `8080` |
| **Database** | MongoDB Atlas (Mongoose) | cloud |

Il frontend comunica con le API REST del backend; le mappe usano **OpenStreetMap** tramite **Leaflet**.

---

## Funzionalità principali

- **Gestione mezzi** — elenco, ricerca, aggiunta e rimozione di veicoli (targa, sistema operativo del dispositivo di bordo, scadenze assicurazione e bollo)
- **Posizione mezzi** — mappa con marker aggiornati periodicamente (ogni ~10 secondi) che mostrano targa e ultimo aggiornamento GPS
- **Tracker a bordo** — da un mezzo selezionato è possibile avviare/fermare il tracking GPS del dispositivo (geolocalizzazione del browser) e inviare le coordinate al server
- **Percorso** — visualizzazione di itinerari con *Leaflet Routing Machine*, calcolo distanza/tempo e verifica se l’utente si trova all’interno di un’area (geofencing con cerchio)

---

## Architettura

```
┌─────────────────────┐         HTTP REST          ┌─────────────────────┐
│  frontendAngular    │ ─────────────────────────► │   backendNodejs     │
│  (Angular + Leaflet)│     localhost:8080/api     │   (Express)         │
└─────────────────────┘                            └──────────┬──────────┘
                                                              │
                                                              ▼
                                                   ┌─────────────────────┐
                                                   │   MongoDB Atlas     │
                                                   └─────────────────────┘
```

### Entità del dominio

| Entità | Descrizione |
|---|---|
| **Mezzo** | Veicolo della flotta (`targa`, `sistema_operativo`, scadenze, riferimenti alle posizioni) |
| **Posizione** | Punto GPS associato a un mezzo (`latitudine`, `longitudine`, `data_ora`, tipo posizione) |
| **Percorso** | Waypoint di un itinerario (`latitudine`, `longitudine`, `raggio` per geofencing) |
| **Tipopos** | Tipologia di punto: `Inizio`, `Intermedio`, `Fine` |

---

## Struttura del progetto

```
001232478applicativoTesi/
├── backendNodejs/
│   ├── server.js                 # Entry point Express
│   ├── package.json
│   └── app/
│       ├── config/db.config.js   # Stringa di connessione MongoDB
│       ├── models/               # Schema Mongoose (Mezzo, Posizione, Percorso, Tipopos)
│       ├── controllers/          # Logica di business
│       └── routes/               # Endpoint REST
│
├── frontendAngular/
│   ├── package.json
│   └── src/app/
│       ├── components/
│       │   ├── markers/          # Mappa posizioni flotta
│       │   ├── percorso/         # Calcolo e visualizzazione percorso
│       │   ├── mezzi-list/       # Elenco mezzi
│       │   ├── add-mezzo/        # Form nuovo mezzo
│       │   ├── mezzo-details/    # Dettaglio mezzo
│       │   └── tracker/          # Tracking GPS a bordo
│       ├── _services/            # Client HTTP verso le API
│       ├── models/               # Modelli TypeScript
│       └── app-routing.module.ts
│
└── README.md
```

---

## API REST (Backend)

Base URL: `http://localhost:8080`

| Metodo | Endpoint | Descrizione |
|---|---|---|
| `GET` | `/` | Messaggio di benvenuto |
| `GET` | `/api/mezzi` | Elenco di tutti i mezzi |
| `GET` | `/api/mezzi/posizioni` | Mezzi con ultima posizione GPS (aggregation) |
| `GET` | `/api/mezzi/:id` | Dettaglio mezzo per ID |
| `POST` | `/api/mezzi` | Creazione nuovo mezzo |
| `GET` | `/api/posizione` | Elenco posizioni |
| `GET` | `/api/posizione/:mezzoId` | Posizioni filtrate per mezzo |
| `POST` | `/api/posizione/:targa` | Registrazione nuova posizione GPS |
| `GET` | `/api/percorsi` | Elenco percorsi |
| `POST` | `/api/percorsi` | Creazione percorso |
| `GET` | `/api/tipopos` | Tipologie di posizione |

CORS è configurato per accettare richieste da `http://localhost:4200`.

---

## Route Frontend (Angular)

| Path | Componente | Descrizione |
|---|---|---|
| `/` | redirect → `/markers` | Home |
| `/markers` | `MarkersComponent` | Mappa con posizioni dei mezzi |
| `/percorso` | `PercorsoComponent` | Percorso e geofencing |
| `/mezzi` | `MezziListComponent` | Lista mezzi della flotta |
| `/mezzi/aggiungi` | `AddMezzoComponent` | Form inserimento mezzo |
| `/tracker/:targa` | `TrackerComponent` | Tracking GPS per targa |

---

## Prerequisiti

- [Node.js](https://nodejs.org/) (consigliata versione LTS)
- npm (incluso con Node.js)
- Account [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o istanza MongoDB locale)
- Angular CLI (opzionale, già disponibile via `npx`/`npm scripts`)

---

## Installazione e avvio

### 1. Configurare MongoDB

Modificare la stringa di connessione in:

- `backendNodejs/app/config/db.config.js`
- `backendNodejs/server.js` (connessione diretta)

> **Nota di sicurezza:** le credenziali MongoDB risultano attualmente hardcodate nel codice. Si consiglia di spostarle in variabili d’ambiente (es. `.env`) e di non versionarle.

### 2. Avviare il backend

```bash
cd backendNodejs
npm install
node server.js
```

Il server sarà in ascolto su **http://localhost:8080**.  
Al primo avvio, se le collection sono vuote, vengono inseriti dati di esempio (mezzo di prova, posizione, tipi posizione).

### 3. Avviare il frontend

In un secondo terminale:

```bash
cd frontendAngular
npm install
npm start
```

L’applicazione sarà disponibile su **http://localhost:4200**.

---

## Stack tecnologico

### Backend
- **Express** — framework HTTP
- **Mongoose** — ODM per MongoDB
- **CORS** / **body-parser** — middleware
- Dipendenze presenti anche per autenticazione JWT (`jsonwebtoken`, `bcryptjs`) — predisposte ma non pienamente integrate nei flussi principali

### Frontend
- **Angular ~13** — SPA
- **Leaflet** + **ngx-leaflet** — mappe
- **leaflet-routing-machine** — calcolo itinerari
- **leaflet-ant-path** — animazioni percorso
- **Bootstrap 5** — UI
- **RxJS** — gestione asincrona (polling posizioni / tracking)

---

## Flusso tipico d’uso

1. Aprire **Mezzi** e registrare un veicolo (targa, SO, scadenze).
2. Cliccare **SALI A BORDO** sul mezzo → si apre il **Tracker**.
3. Avviare il tracking: il browser invia periodicamente latitudine/longitudine al backend.
4. Nella pagina **Posizione Mezzi** (`/markers`) visualizzare i marker aggiornati sulla mappa.
5. Usare **Percorso** per calcolare itinerari e verificare la presenza in area.

---

## Autore

**Giorgio Michele Rotondi**  
Matricola: **1232478**  
Tesi di laurea — Applicativo MonitFlotta

---

## Licenza

ISC (come dichiarato in `backendNodejs/package.json`).
