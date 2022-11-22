[QIWI SDK](../README.md) / [Exports](../modules.md) / StructInstance

# Interface: StructInstance<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Schema`](../modules.md#schema) |

## Table of contents

### Properties

- [data](StructInstance.md#data)
- [struct](StructInstance.md#struct)

### Methods

- [[iterator]](StructInstance.md#[iterator])
- [bytes](StructInstance.md#bytes)
- [toJSON](StructInstance.md#tojson)

## Properties

### data

• `Readonly` **data**: [`Data`](../modules.md#data)<`T`\>

#### Defined in

dist/cjs/index.d.ts:92

___

### struct

• `Readonly` **struct**: [`Struct`](Struct-1.md)<`T`\>

#### Defined in

dist/cjs/index.d.ts:93

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`<`number`, `any`, `unknown`\>

#### Returns

`Generator`<`number`, `any`, `unknown`\>

#### Defined in

dist/cjs/index.d.ts:96

___

### bytes

▸ **bytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

dist/cjs/index.d.ts:94

___

### toJSON

▸ **toJSON**(): [`Data`](../modules.md#data)<`T`\>

#### Returns

[`Data`](../modules.md#data)<`T`\>

#### Defined in

dist/cjs/index.d.ts:95
