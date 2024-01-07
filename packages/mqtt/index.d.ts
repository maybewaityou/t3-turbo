/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export type MqttState = {
  client: MqttClient | null;
  isSubed: boolean;
  payload: { topic: string; message: string };
  connectStatus: "Idle" | "Connecting" | "Connected" | "Reconnected";
};

export type MqttStore = {
  client: MqttClient | null;
  isSubed: boolean;
  payload: { topic: string; message: string };
  connectStatus: "Idle" | "Connecting" | "Connected" | "Reconnected";
  mqttConnect: (host: string, mqttOption?: IClientOptions) => MqttClient;
  mqttSub: (
    client: MqttClient,
    subscription: { topic: string; qos: QoS },
  ) => void;
  mqttUnSub: (client: MqttClient, subscription: { topic: string }) => void;
  mqttPublish: (context: { topic: string; qos: QoS; payload: any }) => void;
  mqttDisconnect: () => void;
};

export type ZustandImmer = [["zustand/immer", never]];

export type ZustandDevtools = [["zustand/devtools", never]];
