# Projekt-Dokumentation

Damian Eisenring

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
|  17.01.2024     | 0.0.1   | Projektstart |
|       | ...     |                                                              |
|       | 1.0.0   |                                                              |

## 1 Informieren

### 1.1 Ihr Projekt

Eine Blogging-Seite mit React-Frontend und Java-Backend, die es Nutzern ermöglicht, Beiträge zu erstellen und zu teilen.

| US-№ | Verbindlichkeit | Typ          | Beschreibung                                   |
| ---- | --------------- | ------------ | --------------------------------------------- |
| 1    | Muss            | Funktional   | Als ein Nutzer möchte ich mich registrieren, damit ich ein Konto anlegen kann. |
| 2    | Muss            | Funktional   | Als ein Nutzer möchte ich mich anmelden, damit ich Zugang zu meinem Konto habe. |
| 3    | Muss            | Funktional   | Als ein Nutzer möchte ich mich abmelden, damit ich sicherstellen kann, dass mein Konto geschützt ist. |
| 4    | Muss            | Funktional   | Als ein Nutzer möchte ich mein Profil bearbeiten können, damit ich meine Informationen aktuell halten kann. |
| 5    | Muss            | Funktional   | Als ein Nutzer möchte ich Beiträge erstellen, damit ich Inhalte teilen kann. |
| 6    | Muss            | Funktional   | Als ein Nutzer möchte ich Beiträge bearbeiten, damit ich meine Inhalte anpassen kann. |
| 7    | Muss            | Funktional   | Als ein Nutzer möchte ich Beiträge löschen, damit ich ungewollte Inhalte entfernen kann. |
| 8    | Muss            | Funktional   | Als ein Nutzer möchte ich Beiträge mit Titel, Text und Bildern erstellen, damit sie ansprechend und informativ sind. |
| 9   | Kann            | Funktional   | Als ein Nutzer möchte ich Beiträge liken, damit ich mein Interesse zeigen kann. |

### 1.3 Testfälle

| TC-№ | Ausgangslage                           | Eingabe                         | Erwartete Ausgabe                                           |
| ---- | -------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| 1.1  | Nutzer ist nicht registriert.          | Registrierung mit gültigen Daten. | Nutzerkonto wird erstellt, und der Nutzer ist eingeloggt.  |
| 2.1  | Nutzer ist registriert, aber nicht eingeloggt. | Anmeldung mit korrekten Zugangsdaten. | Nutzer wird eingeloggt und erhält Zugriff auf sein Profil. |
| 2.2  | Nutzer gibt falsche Zugangsdaten ein.  | Anmeldung mit ungültigen Daten. | Fehlermeldung: "Ungültige Zugangsdaten".                   |
| 3.1  | Nutzer ist eingeloggt.                 | Abmeldung über die Oberfläche.  | Nutzer wird abgemeldet und zur Startseite weitergeleitet.  |
| 4.1  | Nutzer hat bereits ein Profil erstellt. | Änderungen an den Profildaten.  | Änderungen werden gespeichert und angezeigt.              |
| 5.1  | Nutzer ist eingeloggt.                 | Eingabe von Titel, Text und Bild für einen Beitrag. | Beitrag wird erstellt und ist in der Liste sichtbar.       |
| 6.1  | Beitrag existiert bereits.             | Bearbeitung von Titel oder Text. | Änderungen werden gespeichert und aktualisiert angezeigt. |
| 7.1  | Beitrag existiert bereits.             | Löschbefehl für den Beitrag.    | Beitrag wird gelöscht und aus der Liste entfernt.          |
| 8.1  | Nutzer erstellt einen neuen Beitrag.   | Eingabe von Titel, Text und Bild. | Beitrag wird vollständig mit Titel, Text und Bild angezeigt. |
| 9.1 | Ein Beitrag ist sichtbar. | Klick auf die Like-Schaltfläche. | Der Like-Status wird gespeichert und die Anzahl der Likes erhöht. |



## 2 Planen


| AP-№ | Frist         | Zuständig           | Beschreibung                                       | geplante Zeit |
| ---- | ------------- | ------------------- | ------------------------------------------------- | ------------- |
| 1.A  | 14.02.2024    | Damian Eisenring    | Implementierung der Nutzerregistrierung.          | 100           |
| 2.A  | 14.02.2024    | Damian Eisenring    | Implementierung der Nutzeranmeldung.              | 100           |
| 3.A  | 14.02.2024    | Damian Eisenring    | Implementierung der Nutzerabmeldung.              | 100           |
| 4.A  | 14.02.2024    | Damian Eisenring    | Implementierung der Profilbearbeitungsfunktion.   | 100           |
| 5.A  | 28.02.2024    | Damian Eisenring    | Entwicklung der Beitragsfunktion (Erstellen).     | 100           |
| 6.A  | 28.02.2024    | Damian Eisenring    | Entwicklung der Beitragsfunktion (Bearbeiten).    | 100           |
| 7.A  | 28.02.2024    | Damian Eisenring    | Entwicklung der Beitragsfunktion (Löschen).       | 100           |
| 8.A  | 28.02.2024    | Damian Eisenring    | Entwicklung der Anzeige von Beiträgen mit Titel, Text und Bildern. | 100 |
| 9.A | 28.02.2024    | Damian Eisenring    | Entwicklung der Like-Funktion für Beiträge.       | 100           |

Total: 900 / 20 Lektionen 


## 3 Entscheiden

Ich habe mich dazu entschieden die Meilensteine ein wenig anzupassen, da ich gerne immer ein Arbeitspaket im Backend und Frontend abschliessen möchte, bevor ich ein neues Arbeitspaket beginne. Dies verfolgt das Ziel mir eine verbesserte Übersicht zu verschaffen. Also ist der neuen Meilenstein 2, dass ich mit den Konten Funktionen an Tag 4 fertig sein möchte und der neue Meilenstein 3 ist, dass ich an Tag 6 mit den restlichen Arbeitspaketen fertig sein möchte.

## 4 Realisieren

| AP-№ | Datum | Zuständig | geplante Zeit | tatsächliche Zeit |
| ---- | ----- | --------- | ------------- | ----------------- |
| 1.A  |       |           |               |                   |
| ...  |       |           |               |                   |

✍️ Tragen Sie jedes Mal, wenn Sie ein Arbeitspaket abschließen, hier ein, wie lang Sie effektiv dafür hatten.

## 5 Kontrollieren

### 5.1 Testprotokoll

| TC-№ | Datum | Resultat | Tester |
| ---- | ----- | -------- | ------ |
| 1.1  |       |          |        |
| ...  |       |          |        |

✍️ Vergessen Sie nicht, ein Fazit hinzuzufügen, welches das Test-Ergebnis einordnet.

### 5.2 Exploratives Testen

| BR-№ | Ausgangslage | Eingabe | Erwartete Ausgabe | Tatsächliche Ausgabe |
| ---- | ------------ | ------- | ----------------- | -------------------- |
| I    |              |         |                   |                      |
| ...  |              |         |                   |                      |

✍️ Verwenden Sie römische Ziffern für Ihre Bug Reports, also I, II, III, IV etc.

## 6 Auswerten

✍️ Fügen Sie hier eine Verknüpfung zu Ihrem Lern-Bericht ein.
