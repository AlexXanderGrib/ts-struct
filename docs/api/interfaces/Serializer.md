[QIWI SDK](../README.md) / [Exports](../modules.md) / Serializer

# Interface: Serializer<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`SimpleSerializer`](../classes/internal_.SimpleSerializer.md)

## Table of contents

### Properties

- [defaultValue](Serializer.md#defaultvalue)
- [length](Serializer.md#length)

### Methods

- [deserialize](Serializer.md#deserialize)
- [serialize](Serializer.md#serialize)

## Properties

### defaultValue

• `Readonly` **defaultValue**: `T`

#### Defined in

dist/cjs/index.d.ts:16

___

### length

• `Readonly` **length**: `number`

#### Defined in

dist/cjs/index.d.ts:17

## Methods

### deserialize

▸ **deserialize**(`bytes`, `options`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bytes` | `Uint8Array` |
| `options` | [`SerializationOptions`](SerializationOptions.md) |

#### Returns

`T`

#### Defined in

dist/cjs/index.d.ts:19

___

### serialize

▸ **serialize**(`value`, `options`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `options` | [`SerializationOptions`](SerializationOptions.md) |

#### Returns

`Uint8Array`

#### Defined in

dist/cjs/index.d.ts:18
