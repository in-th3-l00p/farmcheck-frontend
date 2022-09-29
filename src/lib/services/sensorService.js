import axios from "axios";
import {getAuthorizationHeader} from "../auth";

class SensorService {
    /**
     * Creates a new sensor
     * @param farmId farm's id
     * @param name the name of the sensor
     * @param description the description of the sensor
     */
    async createSensor(farmId, name, description) {
        try {
            const resp = await axios.post(
                "/api/farms/sensor",
                {name, description},
                {
                    headers: getAuthorizationHeader(),
                    params: {farmId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets a sensor.
     * @param sensorId sensor's id
     * @return the sensor object
     */
    async getSensor(sensorId) {
        try {
            const resp = await axios.get(
                "/api/sensors",
                {
                    headers: getAuthorizationHeader(),
                    params: {sensorId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets every sensor of a farm
     * @param farmId farm's id
     * @return the list of the farms
     */
    async getSensors(farmId) {
        try {
            const resp = await axios.get(
                "/api/farms/sensor",
                {
                    headers: getAuthorizationHeader(),
                    params: {farmId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    }

    /**
     * Gets every sensor data of a sensor.
     * @param sensorId the sensor's id
     * @return the list of sensor data objects
     */
    async getSensorDataList(sensorId) {
        try {
            const resp = await axios.get(
                "/api/sensors/data",
                {
                    headers: getAuthorizationHeader(),
                    params: {sensorId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.detail.data);
        }
    }

    /**
     * Gets the farm of a sensor
     * @param sensorId the sensor's id
     * @return the farm object
     */
    async getSensorFarm(sensorId) {
        try {
            const resp = await axios.get(
                "/api/sensors/farm",
                {
                    headers: getAuthorizationHeader(),
                    params: {sensorId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.detail.data);
        }
    }

    /**
     * Deletes a sensor from the farm.
     * @param sensorId the sensor's id
     * @return status message
     */
    async deleteSensor(sensorId) {
        const farm = await this.getSensorFarm(sensorId)
        try {
            const resp = await axios.delete(
                "/api/farms/sensor",
                {
                    headers: getAuthorizationHeader(),
                    params: {farmId: farm.id, sensorId}
                }
            );
            return resp.data;
        } catch (err) {
            throw new Error(err.response.detail.data);
        }
    }
}

// main sensor service
const sensorService = new SensorService();
export default sensorService;