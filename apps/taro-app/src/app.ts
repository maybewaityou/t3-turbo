import { PropsWithChildren } from "react";
import { api } from "@/utils/trpc/client";
import { useLaunch } from "@tarojs/taro";

import "windi.css";
import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return children;
}

export default api.withTRPC(App);
