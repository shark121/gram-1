export function idGenerator() {
  let string = "abcdefghijklmonpqrstuvwxyz123456789";

  let id = "";
  let index:number;

  for (let i = 0; i < string.length / 2; i++) {
    index = Math.floor(Math.random() * string.length);

    id = id + string[index];
  }

  return id;
}
