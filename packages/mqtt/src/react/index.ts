/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import mqtt, { IClientOptions, MqttClient } from 'mqtt'
import type { QoS } from 'mqtt-packet'
import { useEffect, useState } from 'react'

export function useMqtt() {
  const [client, setClient] = useState<MqttClient | null>(null)
  const [isSubed, setIsSub] = useState(false)
  const [payload, setPayload] = useState({})
  const [connectStatus, setConnectStatus] = useState('Connect')

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus('Connecting')
    setClient(mqtt.connect(host, mqttOption))
  }
  useEffect(() => {
    if (client) {
      console.log(client)
      client.on('connect', () => {
        setConnectStatus('Connected')
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })
      client.on('reconnect', () => {
        setConnectStatus('Reconnected')
      })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)
      })
    }
  }, [client])

  const mqttSub = (subscription: { topic: string; qos: QoS }) => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        setIsSub(true)
      })
    }
  }

  const mqttUnSub = (subscription: { topic: string; qos: QoS }) => {
    if (client) {
      const { topic } = subscription
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        setIsSub(false)
      })
    }
  }

  const mqttPublish = (context: { topic: string; qos: QoS; payload: any }) => {
    if (client) {
      const { topic, qos, payload } = context
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect')
      })
    }
  }

  return {
    mqttConnect,
    mqttSub,
    mqttUnSub,
    mqttPublish,
    mqttDisconnect,
    payload,
    connectStatus,
    isSubed,
  }
}
