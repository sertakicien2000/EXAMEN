import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class PropAtelier extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/users/newArticle/${localStorage.id}`)
            .then(response => {
                console.log('user-article ==== ', response)
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    liste() {
        return (
            <div>
              <div class="row" id="das">
                {this.state.profil.length > 0
                  ? this.state.profil.map(obj => {
                      return (
                          
                        <div class="col-md-4 carde">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title"><strong>{obj.titre}</strong></h4>
                              <img width="100%" height="100%" src={'http://localhost:8080/api/users/newArticleImage/' + obj.image} alt="pdp" />
                              
                              <labe>Description:</labe><p class="card-text">{obj.description}</p>
                              <labe>Date:</labe><p class="card-text">{obj.date}</p>
                              <labe>Heure de debut:</labe><p class="card-text">{obj.debut}</p>
                              <labe>Durée:</labe><p class="card-text">{obj.duree}</p>
                              <labe>Place disponible:</labe><p class="card-text">{obj.place}</p>
                              <labe>Place reserve:</labe><p class="card-text">{obj.placeRes}</p>
                              <labe>Prix:</labe><p class="card-text">{obj.prix}<p>Ar</p></p>
                              <Link to={"/modifierAtl/" + obj._id} className="btn btn-primary">Editer</Link>
                              {obj.visib == true ? (<button onClick={(e) => {
                                e.preventDefault()
                                axios.get(" http://localhost:8080/api/users/cacherAtl/" + obj._id).then(res => {
                                    axios.get('http://localhost:8080/api/users/newArticle/' + localStorage.id).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })
      
      
                            }}>Desactiver</button>) : (<button onClick={(e) => {
                                e.preventDefault()
                                console.log(obj._id)
                                axios.get("http://localhost:8080/api/users/affichAtl/" + obj._id).then(res => {
                                    axios.get('http://localhost:8080/api/users/newArticle/' + localStorage.getItem('id')).then(res => {
                                        console.log(res.data)
                                        this.setState({ profil: res.data })
                                    })
                                    console.log(res.data)
                                })
      
                            }}>Activer</button>)}
                              </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          );
        }
    //     return <table className="table">
    //         <thead>
    //             <tr>
    //                 <th>TITRE</th>
    //                 <th>PRIX</th>
    //                 <th>DESCRIPTION</th>
    //                 <th>PHOTO</th>
    //                 <th>ACTION</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                 (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {

    //                     return <tr key={obj._id}>
    //                         <td>{obj.titre}</td>
    //                         <td>{obj.prix}</td>
    //                         <td>{obj.description}</td>
    //                         <td>
    //                             <img width="150%" height="50%" src={'http://localhost:8080/api/users/newArticleImage/' + obj.image} alt="pdp" />
    //                         </td>
    //                         <td>
    //                             <Link to={"/modifierAtl/" + obj._id} className="btn btn-primary">Modifier</Link>
    //                         </td>
    //                         <td>
    //                                 </td>
    //                         {obj.visib == true ? (<button onClick={(e) => {
    //                             e.preventDefault()
    //                             axios.get(" http://localhost:8080/api/users/cacherAtl/" + obj._id).then(res => {
    //                                 axios.get('http://localhost:8080/api/users/newArticle/' + localStorage.id).then(res => {
    //                                     console.log(res.data)
    //                                     this.setState({ profil: res.data })
    //                                 })
    //                                 console.log(res.data)
    //                             })


    //                         }}>Desactiver</button>) : (<button onClick={(e) => {
    //                             e.preventDefault()
    //                             console.log(obj._id)
    //                             axios.get("http://localhost:8080/api/users/affichAtl/" + obj._id).then(res => {
    //                                 axios.get('http://localhost:8080/api/users/newArticle/' + localStorage.getItem('id')).then(res => {
    //                                     console.log(res.data)
    //                                     this.setState({ profil: res.data })
    //                                 })
    //                                 console.log(res.data)
    //                             })

    //                         }}>Activer</button>)}
    //                     </tr>

    //                 })) : ('')
    //             }
    //         </tbody>
    //     </table>
    // }
    render() {
        return (
            <div className='app1'>
                {this.liste()}
            </div>
        );
    }
}