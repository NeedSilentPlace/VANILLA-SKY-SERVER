# VANILLA SKY

# Introduction

**VANILLA SKY**는 DJI tello 드론을 컨트롤 할 수 있는 웹용 애플리케이션입니다. \
자신의 드론을 조종할 수 있으며, 드론의 영상정보를 브라우저에 실시간으로 스트리밍합니다. 더불어 드론 사용자의 사진을 인식시키면 영상정보와 사용자 사진을 비교하여 드론이 백플립을 할 수 있는 기능을 구현해 보았습니다.

## Installation

### Client

```
git clone https://github.com/NeedSilentPlace/VANILLA-SKY-CLIENT.git
cd VANILLA-SKY-CLIENT
npm install
npm start
```

### Server

```
git clone https://github.com/NeedSilentPlace/VANILLA-SKY-SERVER.git
cd VANILLA-SKY-SERVER
npm install
npm start
```

**server를 실행시키기 전 drone wifi와 연결되어 있어야 합니다**

## Feature

### Left Controller

- take-off 및 land 버튼을 통한 이륙 착륙 기능
- up/down 및 clockwise(cw), counter clockwise(ccw) 비행 고도 조절 및 방향 전환 기능

### Right Controller

- A: flip right, B: flip left, C: rc control 30 30 0 90
- Forward/Backward/Left/Right 

### Center Screen

- 드론 카메라 영상 스트리밍
- Face-api.js를 이용하여 사용자 얼굴 인식 후 백플립


## Client-Side Specification

- ES2015
- React
- Face-api.js
- Socket.io-client

## Server-Side Specification

- ES2015
- Socket.io
- Websocket

## Test (Client-side)

- Jest와 Enzyme을 이용하여 Component 단위 테스트 구현

## Challenges

- tello 드론이 UDP 프로토콜 사용하여 처음의 기획하였던 웹 스트리밍 채팅 애플리케이션과 다른 방향으로 프로젝트를 진행하게 되어 부담이 되었지만 TCP와 UDP에 대한 공부를 할 수 있는 좋은 기회가 되었습니다.
- 실시간으로 영상을 스트리밍을 하는 데에 버퍼와 영상 데이터 타입에 대한 이해가 부족하다는 것을 많이 느꼈습니다. 스트림과 버퍼에 대한 공부를 더 해보고 싶어졌습니다.
- Face-api.js는 Tensorflow기반으로 만들어졌는데 Tensorflow의 핵심에 대한 이해가 부족한 것 같아 더 학습해 보려고 합니다.

## Things to do

기존의 기획을 추가해보려 합니다. UDP 프로토콜의 문제를 이더넷 LAN선 연결을 통해 사람들에게 실시간으로 영상을 스트리밍을 하면서 채팅기능도 넣어 좀 더 유저들과 상호작용할 수 있는 서비스를 만들어 보고자 합니다.

- 실시간 채팅 기능
- 드론 영상정보를 통한 사진 저장 및 동영상 저장
- 디자인 수정 및 기능 추가

---
Special thanks to [Ken Huh](https://github.com/Ken123777)
and [Nashu](https://github.com/Choinashil)
