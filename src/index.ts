export enum Endianness {
  BIG = "big",
  LITTLE = "little"
}

let systemEndianness: Endianness | undefined;

/**
 *
 *
 * @export
 * @return {Endianness}
 */
export function getSystemEndianness(): Endianness {
  return (systemEndianness ??=
    new Uint16Array(new Uint8Array([0xaa, 0xbb]).buffer)[0] === 0xaa_bb
      ? Endianness.BIG
      : Endianness.LITTLE);
}

/**
 *
 *
 * @template T
 * @template E
 * @param {E} object
 * @return {*}  {Readonly<Pick<E, Exclude<keyof E, number>>>}
 */
function enumToObject<T, E extends Record<string | number, T | string>>(
  object: E
): Readonly<Pick<E, Exclude<keyof E, number>>> {
  const copy: any = {};

  for (const [key, value] of Object.entries(object)) {
    if (typeof key === "string") {
      // eslint-disable-next-line security/detect-object-injection
      copy[key] = value;
    }
  }

  return Object.freeze(copy);
}

export interface SerializationOptions {
  readonly endianness: Endianness;
}

export interface Serializer<T> {
  readonly defaultValue: T;
  readonly length: number;

  serialize(value: T, options: SerializationOptions): Uint8Array;
  deserialize(bytes: Uint8Array, options: SerializationOptions): T;
}
/**
 *
 *
 * @class SimpleSerializer
 * @implements {Serializer<T>}
 * @template T
 */
class SimpleSerializer<T> implements Serializer<T> {
  /**
   * Creates an instance of SimpleSerializer.
   * @param {T} defaultValue
   * @param {number} length
   * @memberof SimpleSerializer
   */
  constructor(
    public readonly defaultValue: T,
    public readonly length: number,
    private readonly _serialize: (
      view: DataView
    ) => (offset: number, value: T, littleEndian: boolean) => void,
    private readonly _deserialize: (
      view: DataView
    ) => (offset: number, littleEndian: boolean) => T,
    public readonly Container: {
      new (values: Iterable<T>): { [index: number]: T };
    }
  ) {}

  /**
   *
   *
   * @param {T} value
   * @param {SerializationOptions} options
   * @return {Uint8Array}  {Uint8Array}
   * @memberof SimpleSerializer
   */
  serialize(value: T, options: SerializationOptions): Uint8Array {
    const result = new Uint8Array(this.length);
    const view = new DataView(result.buffer);
    this._serialize(view).bind(view)(
      0,
      value,
      options.endianness === Endianness.LITTLE
    );
    return result;
  }

  /**
   *
   *
   * @param {Uint8Array} bytes
   * @param {SerializationOptions} options
   * @return {T}  {T}
   * @memberof SimpleSerializer
   */
  deserialize(bytes: Uint8Array, options: SerializationOptions): T {
    // Wrapping to protect against Buffer's .slice() shallow copying
    const buffer = new Uint8Array(bytes).buffer;
    const view = new DataView(buffer);
    return this._deserialize(view).bind(view)(
      0,
      options.endianness === Endianness.LITTLE
    );
  }
}

export const types = Object.freeze({
  uint8: new SimpleSerializer(
    0,
    1,
    (v) => v.setUint8,
    (v) => v.getUint8,
    Uint8Array
  ),
  int8: new SimpleSerializer(
    0,
    1,
    (v) => v.setInt8,
    (v) => v.getInt8,
    Int8Array
  ),
  uint16: new SimpleSerializer(
    0,
    2,
    (v) => v.setUint16,
    (v) => v.getUint16,
    Uint16Array
  ),
  int16: new SimpleSerializer(
    0,
    2,
    (v) => v.setInt16,
    (v) => v.getInt16,
    Int16Array
  ),
  uint32: new SimpleSerializer(
    0,
    4,
    (v) => v.setUint32,
    (v) => v.getUint32,
    Uint32Array
  ),
  int32: new SimpleSerializer(
    0,
    4,
    (v) => v.setInt32,
    (v) => v.getInt32,
    Int32Array
  ),
  uint64: new SimpleSerializer(
    0n,
    8,
    (v) => v.setBigUint64,
    (v) => v.getBigUint64,
    BigUint64Array
  ),
  int64: new SimpleSerializer(
    0n,
    8,
    (v) => v.setBigInt64,
    (v) => v.getBigInt64,
    BigInt64Array
  ),

  bytes(length: number): Serializer<Uint8Array> {
    return {
      length,
      defaultValue: new Uint8Array(length).fill(0),
      serialize(value) {
        return new Uint8Array(value);
      },
      deserialize(bytes) {
        return new Uint8Array(bytes);
      }
    };
  },

  any<T extends { bytes(): Uint8Array }, A extends unknown[]>(
    constructor: {
      new (...parameters: A): T;
      readonly SIZE: number;
      deserialize?(data: Uint8Array): T;
    },
    ...parameters: A
  ): Serializer<T> {
    return {
      length: constructor.SIZE,
      defaultValue: new constructor(...parameters),
      deserialize(bytes) {
        return constructor.deserialize?.(bytes) ?? new constructor(...parameters);
      },
      serialize(value) {
        return value.bytes();
      }
    };
  },

  enum<T>(
    representation: Serializer<T>,
    object: Record<string | number, T | string> | T[],
    defaultValue = representation.defaultValue
  ): Serializer<T> {
    const values = Array.isArray(object)
      ? object
      : Object.values(enumToObject(object));

    return {
      length: representation.length,
      defaultValue,
      serialize(value, options) {
        if (!values.includes(value)) {
          throw new TypeError("Enum does not contain the value");
        }

        return representation.serialize(value, options);
      },

      deserialize(bytes, options) {
        const value = representation.deserialize(bytes, options);

        if (!values.includes(value)) {
          throw new TypeError("Enum does not contain the value");
        }

        return value;
      }
    };
  }
});

export type Schema = Record<string, Serializer<any>>;
export type Data<T extends Schema> = {
  [key in keyof T]: T[key]["defaultValue"];
};

export interface StructInstance<T extends Schema> {
  readonly data: Data<T>;
  readonly struct: Struct<T>;

  bytes(): Uint8Array;
  toJSON(): Data<T>;

  [Symbol.iterator](): Generator<number>;
}

export interface Struct<T extends Schema> {
  readonly SIZE: number;
  readonly ENDIANNESS: Endianness;
  readonly SCHEMA: T;

  deserialize(data: Uint8Array, offset?: number): StructInstance<T>;

  new (data: Data<T>): StructInstance<T>;
}

/**
 *
 *
 * @export
 * @template {Record<string, Serializer<any>>} T
 * @param {Endianness} endianness
 * @param {T} schema
 * @return {Struct<T>}  {Struct<T>}
 */
export function struct<T extends Record<string, Serializer<any>>>(
  endianness: Endianness,
  schema: T
): Struct<T> {
  const size = Object.values(schema).reduce((a, b) => a + b.length, 0);

  return class Struct implements StructInstance<T> {
    static readonly SIZE = size;

    static readonly ENDIANNESS = endianness;
    static readonly SCHEMA = schema;

    /**
     *
     *
     * @static
     * @param {Uint8Array} data
     * @param {number} [offset=0]
     * @return {Struct}
     */
    static deserialize(data: Uint8Array, offset = 0): Struct {
      if (data.length < offset + this.length) {
        throw new Error("Data is too short");
      }

      const properties = new Map<string, unknown>();

      for (const [name, serializer] of Object.entries(schema)) {
        const slice = data.slice(offset, (offset += serializer.length));
        const value = serializer.deserialize(slice, { endianness });

        properties.set(name, value);
      }

      return new this(Object.fromEntries(properties) as any);
    }

    /**
     *
     *
     * @readonly
     */
    get struct() {
      return Struct;
    }

    /**
     * Creates an instance of Struct.
     * @param {Data<T>} data
     */
    constructor(public readonly data: Data<T>) {}

    /**
     *
     *
     * @return {Data<T>}
     */
    toJSON(): Data<T> {
      return this.data;
    }

    /**
     *
     * @yields {number}
     */
    *[Symbol.iterator]() {
      yield* this.bytes();
    }

    /**
     *
     *
     * @return {Uint8Array}
     */
    bytes(): Uint8Array {
      const buffer = new Uint8Array(Struct.SIZE);
      let offset = 0;
      for (const [name, serializer] of Object.entries(schema)) {
        const value = this.data[name as keyof T];
        const bytes = serializer.serialize(value ?? serializer.defaultValue, {
          endianness
        });

        for (const byte of bytes) buffer[offset++] = byte;
      }

      return buffer;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace struct {
  /**
   *
   *
   * @export
   * @template {Schema} T
   * @param {T} schema
   * @return {Struct<T>}
   */
  export function bigEndian<T extends Schema>(schema: T): Struct<T> {
    return struct(Endianness.BIG, schema);
  }
  /**
   *
   *
   * @export
   * @template {Schema} T
   * @param {T} schema
   * @return {Struct<T>}
   */
  export function littleEndian<T extends Schema>(schema: T): Struct<T> {
    return struct(Endianness.LITTLE, schema);
  }

  /**
   *
   *
   * @export
   * @template {Schema} T
   * @param {T} schema
   * @return {Struct<T>}
   */
  export function systemEndian<T extends Schema>(schema: T): Struct<T> {
    return struct(getSystemEndianness(), schema);
  }
}
