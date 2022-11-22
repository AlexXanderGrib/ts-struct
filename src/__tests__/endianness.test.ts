import { Endianness, getSystemEndianness } from "..";

test("System endianness to be endianness", () => {
  expect(Object.values(Endianness)).toContain(getSystemEndianness());
});
