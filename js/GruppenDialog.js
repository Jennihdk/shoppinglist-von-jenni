/**
 * Diese Komponente
 * props: showDialog zeigt das Fenster Gruppe bearbeiten
 *        gruppenListe zeigt die Gruppenliste an, die bearbeitet wird und wurde
 */

class GruppenDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDialog: this.props.visible,
      gruppenListe: this.props.gruppenListe
    }
  }

  /**
   * Diese Methode fĆ¼gt eine neue Gruppe hinzu
   * und wird mit dem Button in Zeile 68 ausgefĆ¼hrt
   */
  gruppeHinzufuegen = () => {
    let gruppenEingabe = document.getElementById("gruppeneingabe")
    if (gruppenEingabe.value.trim().length > 0) {
      App.gruppeHinzufuegen(gruppenEingabe.value)
      this.setState({gruppenListe: App.gruppenListe})
    }
    gruppenEingabe.value = ""
    gruppenEingabe.focus()
  }

  /**
   * Diese Methode entfernt eine Gruppe mit ihren Artikeln
   * und wird mit dem Button in Zeile 78 entfernt
   * @param gruppenId aus App.js gruppe.id = gruppenId {@link gruppeFinden}
   */

  gruppeEntfernen = (gruppenId) => {
    App.gruppeEntfernen(gruppenId)
    this.setState({gruppenListe: App.gruppenListe})
  }

  /**
   * schlieĆt das Fenster Gruppe bearbeiten
   * mit dem Button aus
   */

  onDialogClose = () => {
    this.setState({showGruppenDialog: false})
  }

  /**
   *
   * @returns {JSX.Element} "Gruppe bearbeiten" Fenster
   * mit einem Textfeld, HinzufĆ¼genbutton und SchlieĆen Button
   */

  render() {
    return (
      <div className={"mdc-dialog " + (this.props.visible ? "mdc-dialog--open" : " ")}>
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">

            <h2 className="mdc-dialog__title">Gruppen bearbeiten</h2>

            <div className="mdc-dialog__content">
              <nav>
                <input type="text" id="gruppeneingabe" placeholder="Gruppe hinzufĆ¼gen"/>
                <button className="material-icons" id="gruppehinzufĆ¼gen" onClick={() => this.gruppeHinzufuegen()}>add_circle_outline</button>
              </nav>
            </div>
            <hr/>

            <dl className="mdc-deprecated-list">
              {this.state.gruppenListe.map(gruppe => (
                <dt key={gruppe.id}>
                  <span id="gruppenName">{gruppe.name}</span>
                  <i id="gruppeentfernen" className="material-icons"
                     onClick={() => this.gruppeEntfernen(gruppe.id)}>delete</i>
                </dt>
              ))}
            </dl>


            <div className="mdc-dialog__actions">
              <button type="button" className="mdc-button mdc-dialog__button"
                      onClick={this.props.onDialogClose}>
                <span className="mdc-button__label">Schliessen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
