export function mergeJsonObject(jsonObject1, jsonObject2) {
  var resultJsonObject = {};
  for (var attr in jsonObject1) {
    resultJsonObject[attr] = jsonObject1[attr];
  }
  for (var attr in jsonObject2) {
    resultJsonObject[attr] = jsonObject2[attr];
  }
  return resultJsonObject;
}
