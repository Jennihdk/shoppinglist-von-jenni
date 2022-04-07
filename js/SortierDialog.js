/**
 * Diese Kompontente rendert den SortierDialog
 */

class SortierDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showDialog: this.props.visible,
      sortierung: this.props.sortierung
    }
  }

  handleChange = (e) => {
    this.setState({sortierung: e.target.value})
  }

  dialogHandler = (sortieren) => {
    this.props.onDialogClose(this.state.sortierung, sortieren)
  }

  render() {
    const style = {
      display: 'flex'
    }
    return (
      <div className={'mdc-dialog ' + (this.props.visible ? 'mdc-dialog--open' : '')}>
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title">Wähle die Sortierung:</h2>

            <div className="mdc-dialog__content">
              <ul className="mdc-deprecated-list" onChange={this.handleChange}>
                <li><label htmlFor="auf">
                  <input type="radio" id="auf" name="Sortierung" value="Aufsteigend"
                         defaultChecked={this.state.sortierung=="Aufsteigend"}/> Aufsteigend
                </label>
                </li>
                <li><label htmlFor="ab">
                  <input type="radio" id="ab" name="Sortierung" value="Absteigend"
                         defaultChecked={this.state.sortierung=="Absteigend"}/> Absteigend
                </label>
                </li>
                <hr/>
                <li><label htmlFor="alp">
                  <input type="radio" id="alp" name="Sortierung" value="Eigene"
                         defaultChecked={this.state.sortierung=="Eigene"}/> eigene Reihenfolge
                </label>
                </li>
              </ul>
            </div>

            <div className="mdc-dialog__actions">
              <button type="button" className="mdc-button mdc-button--raised"
                      onClick={() => this.dialogHandler(false)}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Abbrechen</span>
              </button>
              &nbsp;
              <button type="button" className="mdc-button mdc-button--raised"
                      onClick={() => this.dialogHandler(true)}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">OK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
