import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const Dht22SensorReadings = ({device, http, httpAction, tile, useHttp, useInterval }) => {

    const device_state = useSelector(state => state.DeviceController.data[tile.id], shallowEqual) || {}
    const user = useSelector(state => state.User)
    const temperature = Math.round((device_state[http['get_reading']]?.temperature * 9/5 + 32) * 10) / 10 || 0
    const humidity = Math.round(device_state[http['get_reading']]?.humidity * 10) / 10 || 0
    const dispatch = useDispatch()

    let backgroundColor = 'cyan'

    useHttp(device.id, tile.id, http['get_reading'])

    useInterval(() => {
        httpAction(dispatch, user.token, device.id, tile.id, http['get_reading'])
    }, 5 * 60000)

    if(temperature <= 0) {
        backgroundColor = '#7293c9'
    }

    if(temperature >= 1 && temperature < 33) {
        backgroundColor = '#89bade'
    }

    if(temperature >= 33 && temperature < 50) {
        backgroundColor = '#89bade'
    }

    if(temperature >= 50 && temperature < 60) {
        backgroundColor = '#a6c7ea'
    }

    if(temperature >= 60 && temperature < 70) {
        backgroundColor = '#a9dad1'
    }

    if(temperature >= 70 && temperature < 80) {
        backgroundColor = '#90cfb5'
    }
    if(temperature >= 80 && temperature < 90) {
        backgroundColor = '#febd7d'
    }

    if(temperature >= 90 && temperature < 100) {
        backgroundColor = '#f8b2bc'
    }

    if(temperature >= 100 && temperature < 110) {
        backgroundColor = '#f59598'
    }

    if(temperature >= 110) {
        backgroundColor = '#f59598'
    }

    const circle_style = { 
        position: 'relative', 
        fontWeight: 'bold', 
        fontSize: 43, 
        padding: 0, 
        margin: 10, 
        backgroundColor, 
        width: 110, 
        height: 110
    }

    const temp_style = {
        textShadow: '1px 1px #2b2b2b',
        position: 'absolute', 
        top: 50, 
        left: '%50',
        transform: 'translate(-50%, -50%)'
    }

    if(!device_state[http['get_reading']]) {
        return (
            <div className="txt_center"><br />
                <div className="button_loader button_loader_l"></div>
                <p>Getting Data...</p>
            </div>
        )
    }

    return (
        <div className="txt_center">
            <div className="circ" style={circle_style} title="Current Temperature">
                <span style={temp_style}>{temperature}</span>
            </div>
            <div>
                <span title="Current Temperature" style={{color: backgroundColor}}>{temperature}&deg;F</span> / <span title="Current Humidity">{humidity}%</span>
            </div>
        </div>
    )
}

export default Dht22SensorReadings