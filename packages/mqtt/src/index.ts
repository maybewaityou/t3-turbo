/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import mqtt, { IClientOptions, MqttClient } from 'mqtt'
import type { QoS } from 'mqtt-packet'

import { create } from 'zustand'

type MqttState = {
  client: MqttClient | null
  isSubed: boolean
  payload: { topic: string; message: string }
  connectStatus: 'Idle' | 'Connecting' | 'Connected' | 'Reconnected'
}

type MqttStore = {
  client: MqttClient | null
  isSubed: boolean
  payload: { topic: string; message: string }
  connectStatus: 'Idle' | 'Connecting' | 'Connected' | 'Reconnected'
  mqttConnect: (host: string, mqttOption?: IClientOptions) => MqttClient
  mqttSub: (client: MqttClient, subscription: { topic: string; qos: QoS }) => void
  mqttUnSub: (client: MqttClient, subscription: { topic: string }) => void
  mqttPublish: (context: { topic: string; qos: QoS; payload: any }) => void
  mqttDisconnect: () => void
}

const defaultState: MqttState = {
  client: null,
  isSubed: false,
  payload: { topic: '', message: '' },
  connectStatus: 'Idle',
}

export type { MqttClient } from 'mqtt'
export type { MqttState, MqttStore }

export const useMqttStore = create<MqttStore>((set, get) => ({
  ...defaultState,

  mqttConnect: (host: string, mqttOption?: IClientOptions) => {
    set((state) => ({ ...state, connectStatus: 'Connecting' }))
    const client = mqtt.connect(host, mqttOption)
    if (client) {
      get().mqttUnSub(client, { topic: 'test-topic/ping' })
      get().mqttSub(client, { topic: 'test-topic/ping', qos: 2 })

      set((state) => ({ ...state, client }))
      client.on('connect', () => {
        set((state) => ({ ...state, connectStatus: 'Connected' }))
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
        set((state) => ({ ...state, payload }))
        console.log('Received message: ', payload)
      })
    }
    return client
  },

  mqttSub: (client: MqttClient, subscription: { topic: string; qos: QoS }) => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log('Subscribe to topics success', topic)

        set((state) => ({ ...state, isSubed: true }))
      })
    }
  },

  mqttUnSub: (client: MqttClient, subscription: { topic: string }) => {
    if (client) {
      const { topic } = subscription
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        console.log('Unsubscribe success', topic)
        set((state) => ({ ...state, isSubed: false }))
      })
    }
  },

  mqttPublish: (context: { topic: string; qos: QoS; payload: any }) => {
    const client = get().client
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
  },

  mqttDisconnect: () => {
    const client = get().client
    if (client) {
      client.end(() => {
        set((state) => ({ ...state, connectStatus: 'Idle' }))
      })
    }
  },
}))

// export function useMqtt() {
//   const [client, setClient] = useState<MqttClient | null>(null)
//   const [isSubed, setIsSub] = useState(false)
//   const [payload, setPayload] = useState<{ topic: string; message: string }>({
//     topic: '',
//     message: '',
//   })
//   const [connectStatus, setConnectStatus] = useState('Idle')

//   function mqttConnect(host: string, mqttOption?: IClientOptions) {
//     setConnectStatus('Connecting')
//     const client = mqtt.connect(host, mqttOption)
//     setClient(client)
//     return client
//   }
//   useEffect(() => {
//     if (client) {
//       client.on('connect', () => {
//         setConnectStatus('Connected')
//       })
//       client.on('error', (err) => {
//         console.error('Connection error: ', err)
//         client.end()
//       })
//       // client.on('reconnect', () => {
//       //   setConnectStatus('Reconnected')
//       // })
//       client.on('message', (topic, message) => {
//         const payload = { topic, message: message.toString() }
//         setPayload(payload)
//         console.log('Received message: ', payload)
//       })
//     }
//   }, [client])

//   function mqttSub(client: MqttClient, subscription: { topic: string; qos: QoS }) {
//     if (client) {
//       const { topic, qos } = subscription
//       client.subscribe(topic, { qos }, (error) => {
//         if (error) {
//           console.log('Subscribe to topics error', error)
//           return
//         }
//         setIsSub(true)
//       })
//     }
//   }

//   function mqttUnSub(client: MqttClient, subscription: { topic: string }) {
//     if (client) {
//       const { topic } = subscription
//       client.unsubscribe(topic, (error) => {
//         if (error) {
//           console.log('Unsubscribe error', error)
//           return
//         }
//         setIsSub(false)
//       })
//     }
//   }

//   function mqttPublish(context: { topic: string; qos: QoS; payload: any }) {
//     if (client) {
//       const { topic, qos, payload } = context
//       let postPayload = payload
//       if (typeof payload === 'object') postPayload = JSON.stringify(payload)
//       client.publish(topic, postPayload, { qos }, (error) => {
//         if (error) {
//           console.log('Publish error: ', error)
//         }
//       })
//     }
//   }

//   function mqttDisconnect() {
//     if (client) {
//       client.end(() => {
//         setConnectStatus('Connect')
//       })
//     }
//   }

//   return {
//     client,
//     mqttConnect,
//     mqttSub,
//     mqttUnSub,
//     mqttPublish,
//     mqttDisconnect,
//     payload,
//     connectStatus,
//     isSubed,
//   }
// }
