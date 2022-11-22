import { struct, types } from "..";

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

describe("Serialization", () => {
  const packet = new Ethernet({
    type: EtherType.Ether,
    source: MacAddress.parse("e0:2b:e9:77:c2:02"),
    target: MacAddress.parse("ff:ff:ff:ff:ff:ff")
  });

  const data = Buffer.concat([
    Buffer.from([0xe0, 0x2b, 0xe9, 0x77, 0xc2, 0x02]), // source
    Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff]), // target
    Buffer.from([0x00, 0x01]) // type
  ]);

  test("Ethernet Packet", () => {
    expect(Buffer.from(packet.bytes())).toEqual(data);
    expect(Ethernet.deserialize(data)).toStrictEqual(packet);
  });
});
