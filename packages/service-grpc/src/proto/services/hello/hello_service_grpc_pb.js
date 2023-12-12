// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var services_hello_hello_service_pb = require('../../services/hello/hello_service_pb.js');

function serialize_services_hello_HelloReply(arg) {
  if (!(arg instanceof services_hello_hello_service_pb.HelloReply)) {
    throw new Error('Expected argument of type services.hello.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_services_hello_HelloReply(buffer_arg) {
  return services_hello_hello_service_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_services_hello_HelloRequest(arg) {
  if (!(arg instanceof services_hello_hello_service_pb.HelloRequest)) {
    throw new Error('Expected argument of type services.hello.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_services_hello_HelloRequest(buffer_arg) {
  return services_hello_hello_service_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The greeting service definition.
var GreeterService = exports.GreeterService = {
  // Sends a greeting
sayHello: {
    path: '/services.hello.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: services_hello_hello_service_pb.HelloRequest,
    responseType: services_hello_hello_service_pb.HelloReply,
    requestSerialize: serialize_services_hello_HelloRequest,
    requestDeserialize: deserialize_services_hello_HelloRequest,
    responseSerialize: serialize_services_hello_HelloReply,
    responseDeserialize: deserialize_services_hello_HelloReply,
  },
  sayHelloStreamReply: {
    path: '/services.hello.Greeter/SayHelloStreamReply',
    requestStream: false,
    responseStream: true,
    requestType: services_hello_hello_service_pb.HelloRequest,
    responseType: services_hello_hello_service_pb.HelloReply,
    requestSerialize: serialize_services_hello_HelloRequest,
    requestDeserialize: deserialize_services_hello_HelloRequest,
    responseSerialize: serialize_services_hello_HelloReply,
    responseDeserialize: deserialize_services_hello_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
