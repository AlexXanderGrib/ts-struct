# TS Struct

> Typed binary serializer

[![Test Status](https://github.com/AlexXanderGrib/ts-struct/actions/workflows/test.yml/badge.svg)](https://github.com/AlexXanderGrib/ts-struct)
[![Downloads](https://img.shields.io/npm/dt/ts-struct.svg)](https://npmjs.com/package/ts-struct)
[![last commit](https://img.shields.io/github/last-commit/AlexXanderGrib/ts-struct.svg)](https://github.com/AlexXanderGrib/ts-struct)
[![codecov](https://img.shields.io/codecov/c/github/AlexXanderGrib/ts-struct/main.svg)](https://codecov.io/gh/AlexXanderGrib/ts-struct)
[![GitHub](https://img.shields.io/github/stars/AlexXanderGrib/ts-struct.svg)](https://github.com/AlexXanderGrib/ts-struct)
[![ts-struct](https://snyk.io/advisor/npm-package/ts-struct/badge.svg)](https://snyk.io/advisor/npm-package/ts-struct)
[![Known Vulnerabilities](https://snyk.io/test/npm/ts-struct/badge.svg)](https://snyk.io/test/npm/ts-struct)
[![Quality](https://img.shields.io/npms-io/quality-score/ts-struct.svg?label=quality%20%28npms.io%29&)](https://npms.io/search?q=ts-struct)
[![npm](https://img.shields.io/npm/v/ts-struct.svg)](https://npmjs.com/package/ts-struct)
[![license MIT](https://img.shields.io/npm/l/ts-struct.svg)](https://github.com/AlexXanderGrib/ts-struct/blob/main/LICENSE.txt)
[![Size](https://img.shields.io/bundlephobia/minzip/ts-struct)](https://bundlephobia.com/package/ts-struct)

## 📦 Installation

- **Using `npm`**
  ```shell
  npm i ts-struct
  ```
- **Using `Yarn`**
  ```shell
  yarn add ts-struct
  ```
- **Using `pnpm`**
  ```shell
  pnpm add ts-struct
  ```

## ⚙️ Usage

Model raw packets

```typescript
import { struct, types } from "ts-struct";

export enum EtherType {
  Ether = 0x00_01,
  IPv4 = 0x08_00,
  ARP = 0x08_06,
  IPv6 = 0x86_dd
}

export class MacAddress extends struct.bigEndian({
  value: types.bytes(6)
}) {
  static readonly TYPE = EtherType.Ether;
  static readonly DEFAULT = MacAddress.parse("00:00:00:00:00:00");

  static parse(address: string) {
    const raw = address.replace(/[:-]/g, "");
    const value = Buffer.from(raw, "hex").slice(0, MacAddress.SIZE);

    return new this({ value });
  }

  get address() {
    return [...this.data.value]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join(":");
  }
}

export class IPv4Address extends struct.bigEndian({
  value: types.bytes(4)
}) {
  static readonly TYPE = EtherType.IPv4;
  static readonly DEFAULT = IPv4Address.from("0.0.0.0");

  static from(address: string) {
    const raw = address.split(".").map((part) => Number.parseInt(part, 10));
    const value = Buffer.from(raw).slice(0, IPv4Address.SIZE);

    return new this({ value });
  }
}

export enum ARPOperation {
  REQUEST = 0x00_01,
  REPLY = 0x00_02
}

const net = Object.freeze({
  ether: types.enum<EtherType>(types.uint16, EtherType, EtherType.Ether),
  mac: types.any(MacAddress, MacAddress.DEFAULT.data),
  ipv4: types.any(IPv4Address, IPv4Address.DEFAULT.data),
  arpOperation: types.enum<ARPOperation>(
    types.uint16,
    ARPOperation,
    ARPOperation.REPLY
  )
});

export const Ethernet = struct.bigEndian({
  source: net.mac,
  target: net.mac,
  type: net.ether
});


```
