import './App.css';
import { Button, Input } from 'semantic-ui-react';
import { useState } from 'react';

const App = () => {

  const [city1Error, setCity1Error] = useState(false)
  const [city2Error, setCity2Error] = useState(false)

  async function calcAirQuality(cityNum) {
    const city = document.getElementById(`city${cityNum}`).value
    const api_url = `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?city=${city}`
    const response = await fetch(api_url)
    const responseData = await response.json()

    if (responseData?.results?.length > 0) {
      if (cityNum === 1) { setCity1Error(false) }
      else { setCity2Error(false) }

      const aqData = responseData.results[0].measurements
      let printData = ""

      for (let i = 0; i < aqData.length; i++) {
        printData += `${aqData[i].parameter}: ${aqData[i].value} ${aqData[i].unit}`
        if (i + 1 < aqData.length) {
          printData += " | "
        }
      }
      
      document.getElementById(`aqData${cityNum}`).textContent = printData
      document.getElementById(`date${cityNum}`).textContent = aqData[0].lastUpdated
    }

    else {
      if (cityNum === 1) { setCity1Error(true) }
      else { setCity2Error(true) }  
    }
  }

  return (
    <>
      <div className="cityContainer">
        <Input label="City 1" id="city1" error={city1Error} />
        <Button style={{marginLeft:"16px"}} onClick={() => calcAirQuality(1)}> 
          Calculate Air Quality 
        </Button>
        <div className="text" style={{display: city1Error ? "none" : "block"}}>
          <b> Air Pollutant(s): </b> <span id="aqData1"></span> <b> &ensp; Retrieval Date: </b> <span id="date1"></span>
        </div>
        <div className="text" style={{display: city1Error ? "block" : "none", color: "red"}}>
          ERROR: Invalid City 1 or no data available, please try a new city
        </div>
      </div>

      <div className="cityContainer">
        <Input label="City 2" id="city2" error={city2Error}></Input>
        <Button style={{marginLeft:"16px"}} onClick={() => calcAirQuality(2)}> 
          Calculate Air Quality 
        </Button>
        <div className="text" style={{display: city2Error ? "none" : "block"}}>
          <b> Air Pollutant(s): </b> <span id="aqData2"></span>  <b> &ensp; Retrieval Date: </b> <span id="date2"></span>
        </div>
        <div className="text" style={{display: city2Error ? "block" : "none", color: "red"}}>
          ERROR: Invalid City 2 or no data available, please try a new city
        </div>
      </div>
    </>
    
  );
}

export default App;
