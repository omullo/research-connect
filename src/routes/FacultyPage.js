import React, {Component} from 'react';
import axios from 'axios';
import '../FacultyPage.css';
import Navbar from '../components/StudentNavbar'
import ProfNavbar from '../components/ProfNavbar'
import Footer from '../components/Footer';


import * as Utils from '../components/Shared/Utils.js'

//Utils.gradYearToString(2020) == "Sophomore"


class FacultyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profInfo: {}
        };

     this.separateInterests = this.separateInterests.bind(this);

    }

    separateInterests(list){
        var separated = "";
        if (list != null){
            for (var i = 0; i<list.length; i++){
                if (i == (list.length - 1)){
                    separated += list[i];
                }
                else{
                    separated += list[i];
                    separated += ", ";
                }
            }
        }
        
        console.log(separated);
        return separated;
    }
    
    //this runs before the "render and return ( ... ) " runs. We use it to get data from the backend about the faculty member
    componentWillMount() {
        console.log(this.props.match.params.id);
        axios.get('/api/faculty/' + this.props.match.params.id )
            .then((response) => {
                

                this.setState({profInfo: response.data});
                
            })
            .catch(function (error) {
                Utils.handleTokenError(error);
            });
        
        axios.get('/api/role/' + sessionStorage.getItem('token_id'))
            .then((response) => {
                //if they don't have a role or it's just not showing up for some reason, go to home page
                //remove this line if you want anybody to be able to view opportunity page
                if (!response || response.data === "none" || !response.data) {
                    alert("You must be signed in to view this.");
                    window.location.href = '/';
                }
                else {
                    this.setState({role: response.data});
                }
            })
            .catch(function (error) {
                Utils.handleTokenError(error);
            });
    }


    render() {
        const notProvidedMessage = "Not specified";
        return (

            <div>
            <Navbar/>
            <div className="container">
                
                    <div className="title-box prof-box">
                        <h3><b>{this.state.profInfo.name}</b></h3>    

                        <p><b>Professor</b> in <b>{this.state.profInfo.department}</b> at
                            <b>{this.state.profInfo.labName ? this.state.profInfo.labName : " Cornell"}</b></p>
                        <p><b>Areas of Interest: </b>{(this.state.profInfo.researchInterests) ?
                            this.separateInterests(this.state.profInfo.researchInterests) : " None found"}</p>
                        <div className="row">
                            <div className="column column-30 office">
                                <h6>Office: {this.state.profInfo.office ? this.state.profInfo.office : "Unknown"}</h6>
                            </div>
                            <div className="row">
                                <div className="column column-30">
                                    <h6>Email: <a href={this.state.profInfo.email ? "mailto:" + this.state.profInfo.email : ""}>{this.state.profInfo.email ? this.state.profInfo.email : "Unknown"}</a></h6>
                                </div>
                            </div>
                            <div className="column column-30">
                                <h6>Phone: {this.state.profInfo.phone ? this.state.profInfo.phone : "Unknown"} </h6>
                            </div>
                            <div className="column column-30">
                                <h6><b><a href={this.state.profInfo.labPage ? this.state.profInfo.labPage : window.location.href} target="_blank">Website</a> </b></h6>
                            </div>
                        </div>
                    </div>
                       
                    
                    <div className="prof-box">
                        <h3>About</h3>
                        <p>{this.state.profInfo.researchDescription}</p>
                    </div>
                    {/*TODO will implement later, this is v low priority*/}
                    {/*<div className="prof-box opps">*/}
                        {/*<h3>Opportunities</h3>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                        {/*<div className="prof-box column column-25 prof-box-1">*/}
                        {/*<h4>Opportunity Name</h4>*/}
                        {/*<h5>Few lines of preview text taken from the project description section…</h5>*/}
                        {/*</div>*/}
                        {/*<div className="prof-box column column-25 column-offset-10">*/}
                        {/*<h4>Opportunity Name</h4>*/}
                        {/*<h5>Few lines of preview text taken from the project description section…</h5>*/}
                        {/*</div>*/}
                        {/*<div className="prof-box column column-25 column-offset-10">*/}
                        {/*<h4>Opportunity Name</h4>*/}
                        {/*<h5>Few lines of preview text taken from the project description section…</h5>*/}
                        {/*</div>*/}
                    {/*</div>*/}
            </div>
            
            </div>
        );
    }
}

export default FacultyPage;
