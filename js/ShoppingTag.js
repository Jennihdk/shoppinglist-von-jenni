/**
 * Diese Kompinente fÃžgt Artikel zur Einkaufsliste hinzu
 */

class ShoppingTag extends React.Component {

  constructor(props) {
    super(props);

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
   *
   * @param gruppenId {@link }
   */

  setAktiveGruppe = (gruppenId) => {
    App.aktiveGruppe = gruppenId
    const gruppe = App.gruppeFinden(gruppenId)
    App.informieren(`[App] Gruppe "${gruppe.name}" ist nun aktiv`)
    this.setState({aktiveGruppe: App.aktiveGruppe})
  }

  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    const aktion= artikel.gekauft ? "erledigt" : "reaktiviert"
    App.informieren(`[App] Artikel "${artikel.name}" ${aktion}`)
    this.setState(this.state)
  }

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
            <input type="text" placeholder="Artikel hinzufÃžgen" id="eingabe"/>
            <button onClick={() => this.artikelHinzufuegen()} id="hinzufÃžgen"
                    className="material-icons">add_circle</button>
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
