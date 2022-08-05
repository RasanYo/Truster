from Group import Group
import json

def write_json(file_name, data, write_mode='a'):
    with open(file_name, write_mode) as f:
        json.dump(data, f, indent=4)
    f.close()
            
def read_json(file_name):
    with open(file_name, 'r') as f:
        data = json.load(f)
    f.close()
    return data   

def append_json(file_name, tag, data):
        previous_data = read_json(file_name)[tag]
        previous_data.append(data)
        
        
        new_data = {tag : previous_data}
        write_json(file_name, new_data, write_mode='w')
        
def remove_json_from(file_name, tag, data):
        previous_data = read_json(file_name)
        previous_data = previous_data[tag]
        
        data_filtered = list(filter(lambda json_data: json_data != data, previous_data))
        
        new_data = {tag : data_filtered}
        write_json(file_name, new_data, write_mode='w')
    

groupJSON1 = Group("Test Group", "https://www.facebook.com/", "Milan", False, "test@email.com", "test123").toJSON()
groupJSON2 = Group("Test Group 2", "https://www.facebook.com/", "Milan", False, "test@email.com", "test123").toJSON()
groupJSON3 = Group("Test Group 3", "https://www.facebook.com/", "Milan", False, "test@email.com", "test123").toJSON()




append_json("data/groups.json", "groups", groupJSON2)
data = read_json("data/groups.json")["groups"]
for d in data:
    print(d["name"])
