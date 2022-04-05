class SortierDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortierung: App.sortierung
    }
  }

  handleChange(event) {
    this.setState({sortierung: event.target.value})
  }

  dialogHandler(sortieren) {
    this.props.onDialogClose(this.state.sortierung, sortieren)
  }

  render() {
    const sortKeys = Object.keys(App.SORTIERUNGEN)
    return (
      <div className="mdc-dialog mdc-dialog--open">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title">Wähle die Sortierung:</h2>

            <div className="mdc-dialog__content">
              <ul className="mdc-deprecated-list" onChange={e => this.handleChange(e)}>
                <li><label htmlFor="eigene">
                  <input type="radio" id="eigene" name="Sortierung" value={sortKeys[0]}
                         defaultChecked={this.state.sortierung==sortKeys[0]}/> eigene Reihenfolge
                </label>
                </li>
                <hr/>
                <li><label htmlFor="auf">
                  <input type="radio" id="auf" name="Sortierung" value={sortKeys[1]}
                    defaultChecked={this.state.sortierung==sortKeys[1]}/> Aufsteigend
                </label>
                </li>
                <li><label htmlFor="ab">
                  <input type="radio" id="ab" name="Sortierung" value={sortKeys[2]}
                    defaultChecked={this.state.sortierung==sortKeys[2]}/> Absteigend
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
