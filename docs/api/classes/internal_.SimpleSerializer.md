[QIWI SDK](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / SimpleSerializer

# Class: SimpleSerializer<T\>

[<internal>](../modules/internal_.md).SimpleSerializer

**`Implements`**

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`Serializer`](../interfaces/Serializer.md)<`T`\>

## Table of contents

### Constructors

- [constructor](internal_.SimpleSerializer.md#constructor)

### Properties

- [Container](internal_.SimpleSerializer.md#container)
- [\_deserialize](internal_.SimpleSerializer.md#_deserialize)
- [\_serialize](internal_.SimpleSerializer.md#_serialize)
- [defaultValue](internal_.SimpleSerializer.md#defaultvalue)
- [length](internal_.SimpleSerializer.md#length)

### Methods

- [deserialize](internal_.SimpleSerializer.md#deserialize)
- [serialize](internal_.SimpleSerializer.md#serialize)

## Constructors

### constructor

• **new SimpleSerializer**<`T`\>(`defaultValue`, `length`, `_serialize`, `_deserialize`, `Container`)

Creates an instance of SimpleSerializer.

**`Memberof`**

SimpleSerializer

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `defaultValue` | `T` |
| `length` | `number` |
| `_serialize` | (`view`: `DataView`) => (`offset`: `number`, `value`: `T`, `littleEndian`: `boolean`) => `void` |
| `_deserialize` | (`view`: `DataView`) => (`offset`: `number`, `littleEndian`: `boolean`) => `T` |
| `Container` | (`values`: `Iterable`<`T`\>) => { `[index: number]`: `T`;  } |

#### Defined in

dist/cjs/index.d.ts:44

## Properties

### Container

• `Readonly` **Container**: (`values`: `Iterable`<`T`\>) => { `[index: number]`: `T`;  }

#### Type declaration

• **new SimpleSerializer**(`values`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Iterable`<`T`\> |

#### Defined in

dist/cjs/index.d.ts:33

___

### \_deserialize

• `Private` `Readonly` **\_deserialize**: `any`

#### Defined in

dist/cjs/index.d.ts:32

___

### \_serialize

• `Private` `Readonly` **\_serialize**: `any`

#### Defined in

dist/cjs/index.d.ts:31

___

### defaultValue

• `Readonly` **defaultValue**: `T`

#### Implementation of

[Serializer](../interfaces/Serializer.md).[defaultValue](../interfaces/Serializer.md#defaultvalue)

#### Defined in

dist/cjs/index.d.ts:29

___

### length

• `Readonly` **length**: `number`

#### Implementation of

[Serializer](../interfaces/Serializer.md).[length](../interfaces/Serializer.md#length)

#### Defined in

dist/cjs/index.d.ts:30

## Methods

### deserialize

▸ **deserialize**(`bytes`, `options`): `T`

**`Memberof`**

SimpleSerializer

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Uint8Array` |
| `options` | [`SerializationOptions`](../interfaces/SerializationOptions.md) |

#### Returns

`T`

{T}

#### Implementation of

[Serializer](../interfaces/Serializer.md).[deserialize](../interfaces/Serializer.md#deserialize)

#### Defined in

dist/cjs/index.d.ts:66

___

### serialize

▸ **serialize**(`value`, `options`): `Uint8Array`

**`Memberof`**

SimpleSerializer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `options` | [`SerializationOptions`](../interfaces/SerializationOptions.md) |

#### Returns

`Uint8Array`

{Uint8Array}

#### Implementation of

[Serializer](../interfaces/Serializer.md).[serialize](../interfaces/Serializer.md#serialize)

#### Defined in

dist/cjs/index.d.ts:57
