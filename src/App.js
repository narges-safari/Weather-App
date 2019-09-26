import React, { Component } from 'react';

import './App.css';
import Form from "./components/form";
import Weather from "./components/weather";
import Titles from "./components/title";

class App extends Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (event) => {
        event.preventDefault();
        const city= event.target.city.value;
        const upperCity = city.charAt(0).toUpperCase() + city.substr(1);

        const country = event.target.country.value;
        const upperCountry = country.charAt(0).toUpperCase() + country.substr(1);
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=e09e56d4f00476bc1aeeeaea9457f368`);
        const response = await api_call.json();
        console.log(response);
        if(city && country){
            if(response.main){
                this.setState({
                    temperature: response.main.temp ,
                    city: response.name ,
                    country: response.sys.country ,
                    humidity: response.main.humidity ,
                    description: response.weather[0].description,
                    error: ""
                })
            }
            else {
                this.setState({
                    temperature: '-' ,
                    city: upperCity ,
                    country: upperCountry ,
                    humidity: '-' ,
                    description: '-',
                    error: `the ${upperCity} in ${upperCountry} doesn't exist`
                })
            }
        }else {this.setState({
            error : "please enter the values"
        })}
    }

  render() {
    return (
        <div>
            <div className="wrapper">
                <div className="main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-5 title-container">
                                <Titles />
                            </div>
                            <div className="col-7 form-container">
                                <Form loadWeather={this.getWeather} />
                                <Weather
                                    temperature={this.state.temperature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
