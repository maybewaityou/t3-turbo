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
  const [payload, setPayload] = useState<{ topic: string; message: string }>({
    topic: '',
    message: '',
  })
  const [connectStatus, setConnectStatus] = useState('Idle')

  function mqttConnect(host: string, mqttOption?: IClientOptions) {
    setConnectStatus('Connecting')
    const client = mqtt.connect(host, mqttOption)
    setClient(client)
    return client
  }
  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected')
      })
      client.on('error', (err) => {
        console.error('Connection error: ', err)
        client.end()
      })
      // client.on('reconnect', () => {
      //   setConnectStatus('Reconnected')
      // })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        setPayload(payload)
        console.log('Received message: ', payload)
      })
    }
  }, [client])

  function mqttSub(client: MqttClient, subscription: { topic: string; qos: QoS }) {
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

  function mqttUnSub(client: MqttClient, subscription: { topic: string }) {
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

  function mqttPublish(context: { topic: string; qos: QoS; payload: any }) {
    if (client) {
      const { topic, qos, payload } = context
      let postPayload = payload
      if (typeof payload === 'object') postPayload = JSON.stringify(payload)
      client.publish(topic, postPayload, { qos }, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  function mqttDisconnect() {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect')
      })
    }
  }

  return {
    client,
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
