/**
 * Klasse zum Gruppieren der Artikel
 *
 * @property {number}  gruppenCounter - dient zur Erzeugung eindeutiger Gruppen-IDs
 * @property {number}    id           - eindeutige ID-Nummer der Gruppe
 * @property {number}    index        - Position der Gruppe innerhalb der Gruppenliste
 * @property {string}    name         - Name der Gruppe
 * @property {Artikel[]} artikelListe - Liste der Artikel in dieser Gruppe
 */
class Gruppe {
  static gruppenCounter = 1

  /**
   * Erzeugt eine {@link Gruppe}
   * @param {string} name - Name der neuen Gruppe
   * @param {number} index - Position innerhalb der Gruppenliste
   */
  constructor(name, index) {
    this.id = Gruppe.gruppenCounter++
    this.index = index
    this.name = name
    this.artikelListe = []
  }

  /**
   * Sucht einen Artikel anhand seines Namens
   * @param {string} suchName - Name des gesuchten Artikels
   * @param {boolean} meldungAusgeben - steuert, ob eine Meldung ausgegeben wird
   * @returns {Artikel|null}
   */
  artikelFinden(suchName, meldungAusgeben) {
    let gefundeneArtikel = this.artikelListe.filter(artikel => artikel.name == suchName)
    if (gefundeneArtikel.length > 0) {
      return gefundeneArtikel[0]
    }
    if (meldungAusgeben) {
      App.informieren(`[${this.name}] Artikel "${suchName}" nicht gefunden`, true)
    }
    return null
  }

  /**
   * Listet die Artikel in dieser Gruppe in der Konsole auf
   * @param {boolean} gekauft - steuert die Anzeige der gekauften oder noch zu kaufenden Artikel
   */
  artikelAuflisten(gekauft) {
    this.artikelListe.map(artikel => {
      if (artikel.gekauft == gekauft) {
        console.debug(`  ${artikel.name}`)
      }
    })
  }

  /**
   * Fügt einen Artikel zur ArtikelListe hinzu und gibt diesen als Wert zurück
   * @param {string} name - Name des neuen Artikels
   * @returns {Artikel} neuerArtikel - der neu erzeugte Artikel
   */
  artikelHinzufuegen(name) {
    let vorhandenerArtikel = this.artikelFinden(name, false)
    if (!vorhandenerArtikel) {
      let neuerArtikel = new Artikel(name, this.artikelListe.length)
      this.artikelListe.push(neuerArtikel)
      App.informieren(`[${this.name}] Artikel "${name}" hinzugefügt`)
      return neuerArtikel
    } else {
      App.informieren(`[${this.name}] Artikel "${name}" existiert schon!`, true)
    }
  }

  /**
   * Erzeugt einen neuen Artikel aus einem eingelesenen JSON-Objekt.
   * Wird von {@link App.initialisieren()} verwendet.
   * @param {object} artikel - das übergebene JSON-Objekt
   */
  artikelObjektHinzufuegen(artikel) {
    let neuerArtikel = this.artikelHinzufuegen(artikel.name)
    // kopiert alle Properties aus "artikel" nach "neuerArtikel"
    Object.assign(neuerArtikel, artikel)
  }

  /**
   * Sucht einen Artikel anhand des Namens und benennt ihn um.
   * @param {string} alterName - Name des zu findenden Artikels
   * @param {string} neuerName - neuer Name des Artikels
   */
  artikelUmbenennen(alterName, neuerName) {
    let artikel = this.artikelFinden(alterName, true)
    if (artikel) {
      artikel.name = neuerName
      App.informieren(`[${this.name}] Artikel "${alterName}" umbenannt in "${neuerName}"`)
    }
  }

  /**
   * Entfernt einen Artikel aus der ArtikelListe
   * @param {Artikel} name - Name des zu entfernenden Artikels
   */
  artikelEntfernen(name) {
    let artikel = this.artikelFinden(name, true)
    if (artikel) {
      let index = this.artikelListe.indexOf(artikel)
      this.artikelListe.splice(index, 1)
      App.informieren(`[${this.name}] Artikel "${name}" entfernt`)
    }
  }

  /**
   * Verschiebt einen Artikel von einer anderen Gruppe in diese Gruppe
   * @param {Gruppe} alteGruppe - die Ursprungsgruppe des Artikels
   * @param {Artikel} artikel - der zu verschiebende Artikel
   * @param {number} neuerIndex - die neue Position in der Artikelliste
   */
  artikelVerschieben(alteGruppe, artikel, neuerIndex) {
    // beim neuen Index einfügen
    this.artikelListe.splice(neuerIndex, 0, artikel)
    // die alte Artikel-Position entfernen
    alteGruppe.artikelEntfernen(artikel.name)

  }
}