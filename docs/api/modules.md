[QIWI SDK](README.md) / Exports

# QIWI SDK

## Table of contents

### Modules

- [&lt;internal\&gt;](modules/internal_.md)

### Namespaces

- [default](modules/default.md)
- [struct](modules/struct.md)

### Enumerations

- [Endianness](enums/Endianness.md)

### Interfaces

- [SerializationOptions](interfaces/SerializationOptions.md)
- [Serializer](interfaces/Serializer.md)
- [Struct](interfaces/Struct-1.md)
- [StructInstance](interfaces/StructInstance.md)

### Type Aliases

- [Data](modules.md#data)
- [Schema](modules.md#schema)

### Variables

- [types](modules.md#types)

### Functions

- [getSystemEndianness](modules.md#getsystemendianness)
- [struct](modules.md#struct)

## Type Aliases

### Data

Ƭ **Data**<`T`\>: { [key in keyof T]: T[key]["defaultValue"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Schema`](modules.md#schema) |

#### Defined in

dist/cjs/index.d.ts:88

___

### Schema

Ƭ **Schema**: `Record`<`string`, [`Serializer`](interfaces/Serializer.md)<`any`\>\>

#### Defined in

dist/cjs/index.d.ts:87

## Variables

### types

• `Const` **types**: `Readonly`<{ `int16`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `int32`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `int64`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`bigint`\> ; `int8`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `uint16`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `uint32`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `uint64`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`bigint`\> ; `uint8`: [`SimpleSerializer`](classes/internal_.SimpleSerializer.md)<`number`\> ; `any`: <T, A\>(`constructor`: (...`parameters`: `A`) => `T`, ...`parameters`: `A`) => [`Serializer`](interfaces/Serializer.md)<`T`\> ; `bytes`: (`length`: `number`) => [`Serializer`](interfaces/Serializer.md)<`Uint8Array`\> ; `enum`: <T_1\>(`representation`: [`Serializer`](interfaces/Serializer.md)<`T_1`\>, `object`: `Record`<`string` \| `number`, `string` \| `T_1`\> \| `T_1`[], `defaultValue?`: `T_1`) => [`Serializer`](interfaces/Serializer.md)<`T_1`\>  }\>

#### Defined in

dist/cjs/index.d.ts:68

## Functions

### getSystemEndianness

▸ **getSystemEndianness**(): [`Endianness`](enums/Endianness.md)

**`Export`**

#### Returns

[`Endianness`](enums/Endianness.md)

#### Defined in

dist/cjs/index.d.ts:11

___

### struct

▸ **struct**<`T`\>(`endianness`, `schema`): [`Struct`](interfaces/Struct-1.md)<`T`\>

**`Export`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, [`Serializer`](interfaces/Serializer.md)<`any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endianness` | [`Endianness`](enums/Endianness.md) |
| `schema` | `T` |

#### Returns

[`Struct`](interfaces/Struct-1.md)<`T`\>

{Struct<T>}

#### Defined in

dist/cjs/index.d.ts:114
