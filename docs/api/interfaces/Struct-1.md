[QIWI SDK](../README.md) / [Exports](../modules.md) / Struct

# Interface: Struct<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Schema`](../modules.md#schema) |

## Table of contents

### Constructors

- [constructor](Struct-1.md#constructor)

### Properties

- [ENDIANNESS](Struct-1.md#endianness)
- [SCHEMA](Struct-1.md#schema)
- [SIZE](Struct-1.md#size)

### Methods

- [deserialize](Struct-1.md#deserialize)

## Constructors

### constructor

• **new Struct**(`data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../modules.md#data)<`T`\> |

#### Defined in

dist/cjs/index.d.ts:103

## Properties

### ENDIANNESS

• `Readonly` **ENDIANNESS**: [`Endianness`](../enums/Endianness.md)

#### Defined in

dist/cjs/index.d.ts:100

___

### SCHEMA

• `Readonly` **SCHEMA**: `T`

#### Defined in

dist/cjs/index.d.ts:101

___

### SIZE

• `Readonly` **SIZE**: `number`

#### Defined in

dist/cjs/index.d.ts:99

## Methods

### deserialize

▸ **deserialize**(`data`, `offset?`): [`StructInstance`](StructInstance.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset?` | `number` |

#### Returns

[`StructInstance`](StructInstance.md)<`T`\>

#### Defined in

dist/cjs/index.d.ts:102
