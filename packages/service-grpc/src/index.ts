/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { credentials } from '@grpc/grpc-js'

import { GreeterClient } from './proto/services/hello/hello_service_grpc_pb'

const request = new proto.services.hello.HelloRequest()
request.setName('MeePwn')

const client = new GreeterClient('localhost:50051', credentials.createInsecure())

client.sayHello(request, (err: Error, response: any) => {
  console.log(err)

  if (err) {
    console.log(err)
  } else {
    console.log(response.getMessage())
  }
})
