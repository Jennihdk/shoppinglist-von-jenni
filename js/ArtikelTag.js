/**
 * Diese Komponente zeigt einen Artikel in einer Gruppe (Zeile 18)
 * den man abhaken kann, damit der Artikel zu Erledigt verschoben wird (Zeile 17)
 * oder der Artikel kann gelÃķscht werden (Button in Zeile 19)
 */

class ArtikelTag extends React.Component {
  render = () => {
    return (

      /**
       *
       * props: name & gekauft {@link Artikel}
       *
       */
      <div>
        <dd><label><input type="checkbox" onChange={() => this.props.checkHandler(this.props.artikel)} defaultChecked={this.props.artikel.gekauft}/>
          {this.props.artikel.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
        </label><i id="artikellÃķschen" className="material-icons" onClick={() => this.props.deleteHandler(this.props.artikel.name)}>delete</i> </dd>
      </div>
    )
  }
}
