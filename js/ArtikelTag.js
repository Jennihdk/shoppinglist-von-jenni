/**
 * Diese Komponente rendert die Auflistung der Artikel
 */

class ArtikelTag extends React.Component {
  render = () => {
    return (

      <div>
        <dd>

          <label>
            <input type="checkbox" onChange={() => this.props.checkHandler(this.props.artikel)}
                   defaultChecked={this.props.artikel.gekauft}/>
            {this.props.artikel.gekauft ? <s>{this.props.artikel.name}</s> : this.props.artikel.name}
          </label>

          <i id="artikellöschen" className="material-icons"
             onClick={() => this.props.deleteHandler(this.props.artikel.name)}>delete</i>
        </dd>
      </div>
    )
  }
}
