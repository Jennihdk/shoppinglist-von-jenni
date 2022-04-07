/**
 * Diese Komponente ist zuständig für die komplette Appseite
 */

class ShoppingTag extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @type {{sortierung: string, showGruppenDialog: boolean, showSortierDialog: boolean, aktiveGruppe: number}}
     */
    this.state = {
      aktiveGruppe: 0,
      showGruppenDialog: false,
      sortierung: "Eigene",
      showSortierDialog: false
    }
    this.startzustandLaden()
  }

  /**
   * Diese Methode speichert den aktuellen Zustand der Einkaufsliste
   * @returns {Promise<void>}
   */
  async startzustandLaden() {
    let gespeicherterZustand = localStorage.getItem(App.STORAGE_KEY)
    if (gespeicherterZustand) {
      App.laden()
    } else {
      await App.datenEinlesen()
      this.setState(this.state)
    }
  }

  /**
   * Zeigt die aktive Gruppe und speichert sie
   * @param gruppenId - Gruppe {@link gruppeFinden}
   */
  setAktiveGruppe = (gruppenId) => {
    App.aktiveGruppe = gruppenId
    const gruppe = App.gruppeFinden(gruppenId)
    App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
    this.setState({aktiveGruppe: App.aktiveGruppe})
  }

  /**
   * Diese Methode checkt, ob der Artikel gekauft wurde
   * und speichert den Zustand
   */
  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    const aktion = artikel.gekauft ? "erledigt" : "reaktiviert"
    App.informieren(`[App] Artikel "${artikel.name}" ${aktion}`)
    this.setState(this.state)
  }

  /**
   * Diese Methode fügt einen Artikel zur aktiven Gruppe hinzu
   */
  artikelHinzufuegen = () => {
    let eingabe = document.getElementById("eingabe")
    if (eingabe.value.trim().length > 0) {
      let aktiveGruppe = App.gruppeFinden(App.aktiveGruppe)
      aktiveGruppe.artikelHinzufuegen(eingabe.value)
      this.setState(this.state)
    }
    eingabe.value = ""
    eingabe.focus()
  }

  /**
   * Diese Methode sortiert die Gruppen und deren Artikel alphabetisch
   * @param reihenfolge - {@link sortieren}
   * @param sortieren - {@link sortieren}
   */
  closeSortierDialog = (reihenfolge, sortieren) => {
    if (sortieren) {
      App.sortieren(reihenfolge)
    }
    this.setState({showSortierDialog: false})
  }


  render = () => {
    return (
      <div>
        <header>
          <h1>Einkaufsliste</h1>
          <nav>
            <input type="text" placeholder="Artikel hinzügen" id="eingabe"/>
            <button onClick={() => this.artikelHinzufuegen()} id="hinzufügen"
                    className="material-icons">add_circle
            </button>
          </nav>
        </header>
        <hr/>
        <main>
          <section>

            <h2>Einkaufen</h2>
            <dl>
              {App.gruppenListe.map(gruppe => (
                <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={false}
                            aktiv={gruppe.id == this.state.aktiveGruppe ? true : false}
                            aktiveGruppeHandler={this.setAktiveGruppe} checkHandler={this.artikelChecken}/>
              ))}
            </dl>
          </section>
          <hr/>

          <section>
            <h2>Erledigt</h2>
            {App.gruppenListe.map(gruppe => (
              <GruppenTag key={gruppe.id} gruppe={gruppe} erledigt={true}
                          aktiv={gruppe.id == this.state.aktiveGruppe ? true : false}
                          aktiveGruppeHandler={this.setAktiveGruppe} checkHandler={this.artikelChecken}/>
            ))}
          </section>
        </main>
        <hr/>
        <footer>
          <nav>

            <button onClick={() => this.setState({showGruppenDialog: true})}>
              <span className="material-icons">bookmark_add</span>
            </button>

            <button onClick={() => this.setState({showSortierDialog: true})}>
              <span className="material-icons">sort</span>
            </button>

            <button>
              <span className="material-icons">settings</span>
            </button>

          </nav>
        </footer>

        <GruppenDialog visible={this.state.showGruppenDialog} gruppenListe={App.gruppenListe}
                       onDialogClose={() => this.setState({showGruppenDialog: false})}></GruppenDialog>

        <SortierDialog visible={this.state.showSortierDialog} sortierung={this.state.sortierung}
                       onDialogClose={this.closeSortierDialog}/>

      </div>
    )
  }
}
