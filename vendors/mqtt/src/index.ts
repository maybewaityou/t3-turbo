/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import type { QoS } from "mqtt-packet";
import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { MqttState, MqttStore, ZustandImmer } from "../index.d";

const defaultState: MqttState = {
  client: null,
  isSubed: false,
  payload: { topic: "", message: "" },
  connectStatus: "Idle",
};

export type { MqttClient } from "mqtt";
export type { MqttState, MqttStore };

export const useMqttStore = create<MqttStore, ZustandImmer>(
  immer((set, get) => ({
    ...defaultState,

    mqttConnect: (host: string, mqttOption?: IClientOptions) => {
      set((state) => {
        state.connectStatus = "Connecting";
      });
      const client = mqtt.connect(host, mqttOption);
      if (client) {
        get().mqttUnSub(client, { topic: "test-topic/ping" });
        get().mqttSub(client, { topic: "test-topic/ping", qos: 2 });

        set((state) => {
          state.client = client;
        });
        client.on("connect", () => {
          set((state) => {
            state.connectStatus = "Connected";
          });
        });
        client.on("error", (err) => {
          console.error("Connection error: ", err);
          client.end();
        });
        // client.on('reconnect', () => {
        //   setConnectStatus('Reconnected')
        // })
        client.on("message", (topic, message) => {
          const payload = { topic, message: message.toString() };
          set((state) => {
            state.payload = payload;
          });
          console.log("Received message: ", payload);
        });
      }
      return client;
    },

    mqttSub: (
      client: MqttClient,
      subscription: { topic: string; qos: QoS },
    ) => {
      if (client) {
        const { topic, qos } = subscription;
        client.subscribe(topic, { qos }, (error) => {
          if (error) {
            console.log("Subscribe to topics error", error);
            return;
          }
          console.log("Subscribe to topics success", topic);

          set((state) => {
            state.isSubed = true;
          });
        });
      }
    },

    mqttUnSub: (client: MqttClient, subscription: { topic: string }) => {
      if (client) {
        const { topic } = subscription;
        client.unsubscribe(topic, (error) => {
          if (error) {
            console.log("Unsubscribe error", error);
            return;
          }
          console.log("Unsubscribe success", topic);
          set((state) => {
            state.isSubed = false;
          });
        });
      }
    },

    mqttPublish: (context: { topic: string; qos: QoS; payload: any }) => {
      const client = get().client;
      if (client) {
        const { topic, qos, payload } = context;
        let postPayload = payload;
        if (typeof payload === "object") postPayload = JSON.stringify(payload);
        client.publish(topic, postPayload, { qos }, (error: Error) => {
          if (error) {
            console.log("Publish error: ", error);
          }
        });
      }
    },

    mqttDisconnect: () => {
      const client = get().client;
      if (client) {
        client.end(() => {
          set((state) => {
            state.connectStatus = "Idle";
          });
        });
      }
    },
  })),
);
