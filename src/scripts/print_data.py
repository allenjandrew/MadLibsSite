import json

filename = "src/assets/data.json"

with open(filename) as f:
    data = json.load(f)
    keys = data.keys()
    for key in keys:
        print(key)
        # print("".join(data[key]["text"]))
