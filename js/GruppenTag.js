/**
 * Diese Komponente ist zuständig für die Auflistung der Gruppen
 */

class GruppenTag extends React.Component {

  /**
   * Diese Methode entfernt einen Artikel aus einer Gruppe
   * mit dem Button {@link ArtikelTag}
   * @param artikelName - Artikel
   */

  artikelEntfernen = (artikelName) => {
    this.props.gruppe.artikelEntfernen(artikelName)
    this.props.aktiveGruppeHandler(this.props.gruppe.id)
  }


  render = () => {
    const erledigt = this.props.erledigt
    let itemsRelevant = this.props.gruppe.artikelListe.filter(item => item.gekauft == this.props.erledigt)

    return (
      <div>
        <dt className={this.props.aktiv && !erledigt ? "aktiv" : "inaktiv"}
            onClick={() => !erledigt ? this.props.aktiveGruppeHandler(this.props.gruppe.id) : ''}>
          <span>{this.props.gruppe.name}</span>
        </dt>
        {itemsRelevant.map(artikel => (
          <ArtikelTag key={artikel.id} artikel={artikel} checkHandler={this.props.checkHandler}
                      deleteHandler={this.artikelEntfernen}/>
        ))}
      </div>
    )
  }
}
