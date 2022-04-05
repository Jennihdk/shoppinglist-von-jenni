/**
 * Klasse zum Beschreiben eines Artikels
 *
 * @property {number}   artikelCounter - dient zur Erzeugung eindeutiger Artikel-IDs
 * @property {number}   id      - eindeutige ID-Nummer des Artikels
 * @property {number}   index   - Position des Artikels innerhalb der Artikelliste
 * @property {string}   name    - Name des Artikels
 * @property {boolean}  gekauft - merkt sich, ob der Artikel bereits gekauft wurde
 */
class Artikel {
  // React benötigt eindeutige IDs für seine Elemente, welche dieser Zähler erzeugt
  static artikelCounter = 1

  /**
   * Erzeugt einen {@link Artikel}
   * @param {string} name - Name des neuen Artikels
   * @param {number} index - Position innerhalb der Artikelliste
   */
  constructor(name, index) {
    this.id = Artikel.artikelCounter++
    this.index = index
    this.name = name
    this.gekauft = false
  }
}